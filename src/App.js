import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('mahasiswa');
    this.unsubscribe = null;
    this.state = {
      mahasiswa: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const mahasiswa = [];
    querySnapshot.forEach((doc) => {
      const { nim, nama, angkatan, jurusan, status } = doc.data();
      mahasiswa.push({
        key: doc.id,
        doc,
        nim, 
        nama, 
        angkatan, 
        jurusan, 
        status 
      });
    });
    this.setState({
      mahasiswa
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Daftar Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Tambah Data</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Angkatan</th>
                  <th>Jurusan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.mahasiswa.map(mahasiswa =>
                  <tr>
                    <td><Link to={`/show/${mahasiswa.key}`}>{mahasiswa.nim}</Link></td>
                    <td>{mahasiswa.nama}</td>
                    <td>{mahasiswa.angkatan}</td>
                    <td>{mahasiswa.jurusan}</td>
                    <td>{mahasiswa.status}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
