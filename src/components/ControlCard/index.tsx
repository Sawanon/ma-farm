import { GiFastNoodles } from "react-icons/gi";
import Switch from "../Switch";
import { useState } from "react";
import { IconType } from "react-icons";

const ControlCard = ({
  Icon,
  label = "",
  onClick = () => {},
  className = '',
  value,
}: {
  Icon?: IconType;
  label: string;
  onClick: (value: boolean) => void;
  className: string;
  value?: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleOnClick = () => {
    onClick(!isActive);
    setIsActive((prev) => !prev);
  };

  return (
    <div className={`rounded-lg px-4 py-6 min-w-32 w-max ${className}`}>
      <div className={`text-2xl flex justify-center`}>
        {Icon ? <Icon /> : <GiFastNoodles />}
      </div>
      <div className={`text-center mt-4`}>{label}</div>
      <div className={`flex justify-center mt-4`}>
        <Switch value={value ?? isActive} onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default ControlCard;
