import React from "react";


export class AccesDenied extends React.Component {

    render() {

        return (


            <div class="container">
                <div className="row justify-content-center my-4">

                    <div className="col-xl-10 col-lg-12 col-md-9 my-5">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">

                                <div className="">

                                    <div className="row justify-content-center">
                                        <div className="p-5">


                                            <div><div class="lock"></div>
                                                <div class="message">
                                                    <h1>Access to this page is restricted</h1>
                                                    <p>Please check with the site admin if you believe this is a mistake.</p>
                                                </div></div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




        )
    }



}