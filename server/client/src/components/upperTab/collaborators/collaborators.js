import React from 'react';
import Classes from './collaborators.module.css';

export default class collaborators extends React.PureComponent {
    state = {
        show: false
    }

    handleClick = () => this.setState({ show: !this.state.show });
    render() {
        return (
            <div>
                <div className={Classes.collaborators} onClick={this.handleClick}>
                    <i className="fas fa-users fa-lg" style={{ margin: "0 0.5rem" }}></i>
                    Collaborators
                </div>
                {this.state.show ?
                    <div className={Classes.show}>
                        <div
                            className={Classes.option}
                            onClick={(e) => { this.props.modal(e); this.handleClick() }}>
                            Add
                        </div>
                        <div
                            className={Classes.option}
                            onClick={(e) => { this.props.modal(e); this.handleClick() }}>
                            Remove
                        </div>
                    </div> : null
                }
            </div>
        )
    }

}
