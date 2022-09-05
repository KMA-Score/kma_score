import PropTypes from "prop-types";

export default function Chip({ children, cssClass }) {
  return (
    <div className={"w-fit border rounded-lg py-1 px-2.5 flex " + cssClass}>
      {children}
    </div>
  );
}

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  cssClass: PropTypes.string,
};
