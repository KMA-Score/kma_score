import PropTypes from "prop-types";
import { useMemo, useState } from "react";

export default function Alert({ children, isCloseable = true, type = "info" }) {
  const [show, setShow] = useState(true);
  const iconClass = useMemo(() => {
    return "hidden pr-2 md:block md:text-2xl";
  }, []);

  const setAlertColors = () => {
    switch (type) {
      case "success":
        return "border-green-400 bg-green-700";
      case "error":
        return "border-red-400 bg-red-700";
      case "warning":
        return "border-yellow-400 bg-yellow-700";
      default:
        return "border-blue-400 bg-blue-700";
    }
  };

  const setAlertIcon = () => {
    switch (type) {
      case "success":
        return (
          <ion-icon
            name="checkmark-done-circle-outline"
            class={iconClass}
          ></ion-icon>
        );
      case "error":
        return <ion-icon name="warning-outline" class={iconClass}></ion-icon>;
      case "warning":
        return (
          <ion-icon name="alert-circle-outline" class={iconClass}></ion-icon>
        );
      default:
        return (
          <ion-icon
            name="information-circle-outline"
            class={iconClass}
          ></ion-icon>
        );
    }
  };

  if (show)
    return (
      <div className={`flex p-2.5 rounded-lg items-center ${setAlertColors()}`}>
        <div className="flex-grow flex items-center">
          {setAlertIcon()}
          {children}
        </div>

        {isCloseable && (
          <div className="flex">
            <button
              className="flex"
              type="button"
              onClick={() => setShow(false)}
            >
              <ion-icon
                name="close"
                class="text-white hover:text-neutral-300 text-2xl"
              ></ion-icon>
            </button>
          </div>
        )}
      </div>
    );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  isCloseable: PropTypes.bool,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
};
