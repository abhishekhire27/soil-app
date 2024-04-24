import './Card.css';

const Card = (props) => {
    return (
        <div class="container custom-card">
            <div class="row justify-content-center">
                <div class="col">
                    <div class="card">
                        <div class="card-header card-header-styling header-text">{props.title}</div>
                        <div class="card-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Card;