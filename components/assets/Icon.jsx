import ArrowLong from "/public/icons/arrow-down-long.svg"

const Icon = ({id}) => {
  switch (id) {
    case "arrow-long": return <ArrowLong />;
    default: return <></>;
  }
}

export default Icon