import React from 'react';

import './Modal.css';

const modal = (props) => {
    return (
                
        <div>
            {console.log(props)}
            
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
            <h3> ARTWORK NAME HERE </h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue">ADD TO YOUR COLLECTION</button>
                </div>
            </div>
        </div>
    )
}

export default modal;