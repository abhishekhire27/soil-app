const Button = (props) => {
    return (
        <button type={props.buttonType} class="btn btn-success m-2" onClick = {props.onClick ?? null}  >
            {props.buttonName}
        </button>
    );
}

export default Button;