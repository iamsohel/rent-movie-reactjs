import React, { Component } from 'react';

class Profile extends Component {

    render() { 
        const {user} = this.props;
        return (  
            <div className="my-6 p-6 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">My profile</h6>
                <div className="media text-muted pt-3">
                    <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong className="d-block text-gray-dark">Name :{user.name}</strong>
                    </p>
                </div>
                <div className="media text-muted pt-3">
                    <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong className="d-block text-gray-dark">Email : {user.email}</strong>
                    </p>
                </div>
            </div>
      );
    }
}
 
export default Profile;