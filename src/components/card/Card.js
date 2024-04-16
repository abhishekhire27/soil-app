const Card = (props) => {
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">{props.title}</div>
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