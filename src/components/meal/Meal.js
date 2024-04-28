function Meal(props) {
  return (
    <div className="d-flex my-2">
      <div>
        <img
          style={{ height: "120px", marginRight: ".5rem" }}
          src={`https://spoonacular.com/recipeImages/${props.id}-312x231.${props.imageType}`}
          alt={props.title}
        />
      </div>
      <div>
        <p>{props.title}</p>
        {props.servings ? <p>Servings: {props.servings}</p> : null}
        {props.readyInMinutes ? (
          <p>Ready in {props.readyInMinutes} minutes</p>
        ) : null}
      </div>
    </div>
  );
}

export default Meal;
