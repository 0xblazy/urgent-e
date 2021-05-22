import React from 'react';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import axios from 'axios';
import './FindingHospital.css';

export default class FindingHospital extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
            zoom: 12,
            center: {
                lat: 48.6974615, // Coordonnées de l'IMDC Nancy
                lng: 6.1696225
            },
            hospitals: null,
            markers: null,
            selected_hospital: null,
            selected_open: false
        }
    }

    componentDidMount() {
        if (this.props.address) this.updateCenter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.address && 
            this.props.step === this.props.mapStep &&
            prevProps.address !== this.props.address) {
            this.updateCenter();
            
            if (this.props.perimeter) this.findingHospital();
        }

        if (this.props.address &&
            this.props.perimeter &&
            prevProps.perimeter !== this.props.perimeter) {
            this.findingHospital();
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback) => {
            return;
        };
    }

    loadHandler = (map) => {
        this.setState({
            map: map
        });
    }

    fitBounds = () => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(this.state.center);

        if (this.state.hospitals) {
            this.state.hospitals.map((hospital) => {
                bounds.extend(hospital.location);
                return hospital.id;
            });
        }

        this.state.map.fitBounds(bounds);
    }

    updateCenter = () => {
        axios({
            method: "get",
            url: "https://maps.googleapis.com/maps/api/geocode/json"
                + "?address=" + this.props.address.replace(" ", "+") 
                + "&language=" + this.props.language 
                + "&key=" + process.env.REACT_APP_GOOGLE_API_KEY
        }).then((response) => {
            if (response.data.results[0]) {
                const {lat, lng} = response.data.results[0].geometry.location;

                this.setState({
                    center: {
                        lat: lat,
                        lng: lng
                    }
                });
            } else if (response.data.error_message) {
                console.log(response.data.error_message);
            }
        });
    }

    findingHospital = () => {
        axios({
            method: "get",
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
                + "?location=" + this.state.center.lat + "," + this.state.center.lng
                + "&radius=" + (this.props.perimeter * 1000)
                + "&type=hospital&opennow"
                + "&language=" + this.props.language
                + "&key=" + process.env.REACT_APP_GOOGLE_API_KEY
        }).then((response) => {
            if (response.data.results[0]) {
                const hospitals = [];

                for (const [name, hospital] of Object.entries(response.data.results)) {
                    hospitals.push({
                        id: name,
                        name: hospital.name,
                        address: hospital.vicinity,
                        location: hospital.geometry.location
                    });
                }

                this.setState({
                    hospitals: hospitals
                }, () => {
                    this.fitBounds();
                });
            } else if (response.data.error_message) {
                console.log(response.data.error_message);
            }
        });
    }

    markerLoadHandler = (marker, hospital) => {
        this.setState((prevState) => ({
            markers: {
                ...prevState.markers, [hospital.id]: marker
            }
        }));
    }

    selectHospitalHandler = (hospital) => {
        if (this.state.selected_open) {
            this.setState({
                selected_open: false
            });
        }

        this.setState({
            selected_hospital: hospital,
            selected_open: true 
        }, () => {
            this.props.onHospitalChange(hospital);
        });
    }

    onCloseClickHandler = () => {
        this.setState({
            selected_hospital: null,
            selected_open: false
        },() => {
            this.props.onHospitalChange(null);
        });
    }

    render() {
        return (
            <div className="FindingHospital">
                <LoadScript
                    id="finding-hospital-map"
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    language={this.props.language}
                >
                    <GoogleMap
                        mapContainerClassName="map"
                        zoom={this.state.zoom}
                        center={this.state.center}
                        options={{ 
                            fullscreenControl: false
                        }}
                        onLoad={(map) => this.loadHandler(map)}
                    >
                        {/* Position de l'utilisateur */}
                        {
                            this.state.center &&
                            this.props.address &&
                            <Marker 
                                position={this.state.center}
                                icon={{ 
                                    path: "M 0, 0 a 10,10 0 1,1 20,0 a 10,10 0 1,1 -20,0",
                                    fillColor: "#5271ff",
                                    fillOpacity: 1.0,
                                    strokeColor: "#707070", 
                                    strokeWeight: 1.0
                                 }}
                            />
                        }

                        {/* Position des hopitaux */}
                        {
                            this.state.hospitals &&
                            this.state.hospitals.map((hospital) => (
                                <Marker
                                    key={hospital.id}
                                    position={hospital.location}
                                    onLoad={(marker) => this.markerLoadHandler(marker, hospital)}
                                    onClick={() => this.selectHospitalHandler(hospital)}
                                    icon={{
                                        path: "M0-32c-6.5 0-11.7 5.1-11.7 11.5 0 10.2 11.7 22.2 11.7 22.2s11.7-10.2 11.7-22.2c0-6.3-5.2-11.5-11.7-11.5z",
                                        fillColor: "#ff7177",
                                        fillOpacity: 1.0,
                                        strokeColor: "#cc3030",
                                        strokeWeight: 1.0
                                    }}
                                />
                            ))
                        }

                        {/* InfoWindow de l'hopital sélectionné */}
                        {
                            this.state.selected_hospital &&
                            this.state.selected_open &&
                            <InfoWindow
                                anchor={this.state.markers[this.state.selected_hospital.id]}
                                onCloseClick={() => this.onCloseClickHandler()}
                            >
                                <div className="info-window">
                                    <h3>{this.state.selected_hospital.name}</h3>
                                    <h4>{this.state.selected_hospital.address}</h4>
                                </div>
                            </InfoWindow>
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}