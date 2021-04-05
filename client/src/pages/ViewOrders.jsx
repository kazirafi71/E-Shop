import React from 'react';
import Styles from './Order.module.css'

const ViewOrders = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-9">
                        <h2 className={`${Styles.order} ${Styles.another} py-5`}>View Orders</h2>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrders;