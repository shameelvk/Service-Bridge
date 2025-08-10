import { useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function LocationSelector({ onChange, value }) {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(value || null);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data.locations || []);
      })
      .catch(err => console.error('Failed to fetch locations:', err));
  }, []);


  useEffect(() => {
    if (!value && locations.length > 0) {
      const defaultLoc = locations.find(l => l.name === 'Malappuram') || locations[0];
      setSelected(defaultLoc);
    }
  }, [value, locations]);

  // Handle external value changes
  useEffect(() => {
    setSelected(prevSelected => {
      if (value && value._id !== prevSelected?._id) {
        return value;
      }
      return prevSelected;
    });
  }, [value]);

  useEffect(() => {
    if (selected && onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-1 animate-fade-in">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-900 py-3 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-opacity-75 transition border border-accent-500 text-white">
              <span className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-accent-500 mr-2" />
                <span className="block truncate">
                  {selected ? selected.name : 'Select Location'}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon className="h-5 w-5 text-accent-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {locations.map(location => (
                  <Listbox.Option
                    key={location._id}
                    value={location}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 transition ${active ? 'bg-accent-500 text-gray-900' : 'text-white hover:bg-gray-800'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{location.name}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-300">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
