const Button = (props) => {
  return (
    <button
      type={props.buttonType}
      className="btn my-2"
      style={{ backgroundColor: "rgb(54, 116, 26)", color: "white" }}
      onClick={props.onClick ?? null}
      disabled={props.disabled ?? false}
    >
      {props.buttonName}
    </button>
  );
};

export default Button;
