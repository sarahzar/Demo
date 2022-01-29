
import React from "react";
import Header from "../../Layout/Header";
import Leftside  from "../../Layout/Leftside";
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import AdminService from '../../services/Administration/AdminService'
Chart.register(ArcElement);

export class AdminHome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            countAll: 0,
            countFemme: 0,
            countDocteurs: 0,
            countConfirmed: 0,
            countDomaines: [],
            countDiplomes: [],
            
            
        }
    }

    componentDidMount() {
        this.getReport();
    }

   
    getReport ()  {
   
        AdminService.getReport().then(

            resp => {
                console.log("data",resp.data)
                this.setState({
                    countAll: resp.data.totalCount,
                    countFemme: resp.data.femmesCount,
                    countDocteurs: resp.data.docteursCount,
                    countConfirmed: resp.data.confirmeCount,
                    countDomaines: resp.data.domaineReport,
                    countDiplomes: resp.data.diplomeReports
                })
            });
    }
    render() {
        const colors=[];
        const hoverColors=[];
        const libelles = this.state.countDiplomes.map((d,i) => {
            let names=[];
            names.push(d.name);
            let color=Math.floor(Math.random()*(900000-600000)+600000);
            let hoverColor=color-100000;
            colors.push('#'+color)
            hoverColors.push('#'+hoverColor)
            return names;
        })
        const counts= [];
        this.state.countDiplomes.forEach((d,i) => {      
            counts.push(d.count);
        })

        libelles.push('Docteurs');
        libelles.push('Confirmés');

        counts.push(this.state.countDocteurs);
        counts.push(this.state.countConfirmed);

        colors.push('#4e73df');
        colors.push('#C9DE00');
       

        hoverColors.push('#4e50df');
        hoverColors.push('#a3de00');
             

  
        console.log("colors",colors)
        console.log("colors",hoverColors)

        const myData2 = {
            labels: libelles,
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: colors,
                    hoverBackgroundColor:hoverColors,
                    data: counts
                }
            ]
        }



        return (
            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />

                        <div class="container-fluid">

                            {/* <!-- Page Heading --> */}
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                                <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                            </div>

                            {/* <!-- Content Row --> */}
                            <div class="row">

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-primary shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Total Condidats</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.countAll}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-users fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                {this.state.countDiplomes.map((d) =>
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        {d.name}</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{d.count}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-graduation-cap fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Docteurs</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.countDocteurs}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-graduation-cap fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Pending Requests Card Example --> */}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-warning shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Condidats confirmés</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.countConfirmed}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-user-check fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Content Row --> */}

                            <div class="row">

                                {/* <!-- Content Column --> */}
                                <div class="col-lg-6 mb-4">

                                    {/* <!-- Project Card Example --> */}
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Domaines</h6>
                                        </div>

                                        {this.state.countDomaines.map((d) =>
                                            <div class="card-body">
                                                <h4 class="small font-weight-bold">{d.name} <span
                                                    class="float-right">{d.pourcentage}%</span></h4>
                                                <div class="progress mb-4">
                                                    <div className={d.pourcentage<=20 ? "progress-bar bg-danger" : "progress-bar bg-success"} style={{width: d.pourcentage }} role="progressbar"
                                                        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                            </div>
                                        )}

                                    </div>

                                </div>


                                {/* <!-- Pie Chart --> */}
                                <div class="col-xl-6 col-lg-5">
                                    <div class="card shadow mb-4">
                                        {/* <!-- Card Header - Dropdown --> */}
                                        <div
                                            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-primary">Gatégories</h6>
                                            <div class="dropdown no-arrow">
                                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <div class="dropdown-header">Dropdown Header:</div>
                                                    <a class="dropdown-item" href="#">Action</a>
                                                    <a class="dropdown-item" href="#">Another action</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Card Body --> */}
                                        <div class="card-body">
                                            <div >
                                                <h3>{this.props.title}</h3>
                                                <Doughnut
                                                    data={myData2}
                                                    options={{


                                                        plugins: {
                                                            legend: {
                                                                display: true,
                                                                position: 'right',
                                                            },
  
                                                        }

                                                    }}
                                                />
                                            </div>
                                            {/* <div class="mt-4 text-center small">
                                                <span class="mr-2">
                                                    <i class="fas fa-circle text-primary"></i> Direct
                                                </span>
                                                <span class="mr-2">
                                                    <i class="fas fa-circle text-success"></i> Social
                                                </span>
                                                <span class="mr-2">
                                                    <i class="fas fa-circle text-info"></i> Referral
                                                </span>
                                            </div> */}
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