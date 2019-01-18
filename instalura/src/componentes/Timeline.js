import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fotos: []
        };
        this.login = this.props.login;
    }

    carregaFotos() {
        let url = 'http://localhost:8080/api/fotos?X-AUTH-TOKEN='+ localStorage.getItem('auth-token');
        
        if (this.login) {
            url = `http://localhost:8080/api/public/fotos/${this.login}`;
        }
    
        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
        <div className="fotos container">
          {
              this.state.fotos.map(foto => {
                return (<FotoItem key={foto.id} foto={foto} />);
              })
          }
        </div>            
        );
    }
}