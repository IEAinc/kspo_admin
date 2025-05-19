const TabRadioWrap = ({options, selectedValue, onChange}) => {
  return (
    <div className="flex">
      {options.map((option,index) => (
        <div
          key={option}
          className={`
          flex
          items-center
          justify-center
          h-[36px]
          px-[13px]
          py-[9px]
          border-br-gray
          border-b
          border-t
          cursor-pointer ${
            selectedValue === option ? "bg-primary-blue text-white" : "bg-white text-black"
          }
         ${index === 0
            ? "rounded-l-[4px] border-l border-br-gray border-r"
            : index === options.length - 1
              ? "rounded-r-[4px] border-r"
              : "border-r"}
          `}

          onClick={() => onChange(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );

}
export default TabRadioWrap;