import './Card.css';

const Card = (props) => {
    return (
        <div className="container custom-card">
            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header card-header-styling header-text">{props.title}</div>
                        <div className="card-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;