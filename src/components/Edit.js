import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      body: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswa').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswa = doc.data();
        this.setState({
          key: doc.id,
          nim: mahasiswa.nim,
          nama: mahasiswa.nama,
          angkatan: mahasiswa.angkatan,
          jurusan: mahasiswa.jurusan,
          status: mahasiswa.status
        });
      } else {
        console.log("Error!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({mahasiswa:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, angkatan, jurusan, status } = this.state;

    const updateRef = firebase.firestore().collection('mahasiswa').doc(this.state.key);
    updateRef.set({
      nim, 
      nama, 
      angkatan, 
      jurusan, 
      status 
    }).then((docRef) => {
      this.setState({
        nim: '',
        nama: '',
        angkatan: '',
        jurusan: '',
        status: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">mahasiswa List</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div className="form-group-row">
                            <label htmlFor="nim" className="col-sm-2 col-form-label">NIM</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" name="nim" id="nim" onChange={this.onChange} placeholder="NIM" />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="nama" id="nama" onChange={this.onChange} placeholder="Nama" />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <label htmlFor="angkatan" className="col-sm-2 col-form-label">Tahun Angkatan</label>
                            <div className="col-sm-2">
                            <input type="text" className="form-control"  name="angkatan" id="angkatan" onChange={this.onChange} placeholder="Tahun Angkatan" />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <label htmlFor="jurusan" className="col-sm-2 col-form-label">Jurusan</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control"  name="jurusan" id="jurusan" onChange={this.onChange} placeholder="Jurusan" />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-2">
                            <select className="form-control" id="status" name="status" onChange={this.onChange} placeholder="Status">
                                <option value="" disabled selected>Pilih Status--</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Cuti">Cuti</option>
                                <option value="Lulus">Lulus</option>
                            </select>
                            </div>
                        </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
