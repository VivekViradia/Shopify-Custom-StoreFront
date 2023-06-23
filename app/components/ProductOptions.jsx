import {
  Link,
  useLocation,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';

export default function ProductOptions({options}) {
  // pathname & search will be used to build option URls
  const {pathname, search} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : currentSearchParams;

  return (
    <div className="grid gap-4 mb-6">
      {/* Each option will show a label & option value <Links> */}
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }

        //   get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w[4rem]">
              {option.name}
            </h3>

            <div className="flex flex-wrap items-baseline gap-4">
              {option.value.map((value) => {
                // Build a URLSearchParam object from the current search string
                const linkParams = new URLSearchParams(searchP);
                const isSelected = currentOptionVal === value;
                //   Set the options name & value,overwriting any existing values
                linkParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200 ${
                      isSelected ? 'broder-gray-500' : 'broder-neutral-50'
                    }`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
