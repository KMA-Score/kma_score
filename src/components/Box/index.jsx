import PropTypes from "prop-types";

export default function Box({ children, cssClass, ...props }) {
  return (
    <div className={"text-white p-5 rounded-lg " + cssClass}>{children}</div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  cssClass: PropTypes.string,
};
