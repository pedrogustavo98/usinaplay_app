import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = environment.firebaseConfig;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private db: any;

  constructor(
    private navCtrl: NavController,
    private location: Location,
    private toastController: ToastController
  ) {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  public dados: any = [];

  async ngOnInit() {
    let modulos = await this.consultaModulos();
    let modulosArray: any = {};

    await Promise.all(
      modulos.map(async (modulo: any) => {
        if (!modulosArray[modulo.index]) {
          modulosArray[modulo.index] = {};
        }

        modulosArray[modulo.index]['modulo'] = modulo;

        if (modulo.index === 'programas') {
          modulosArray[modulo.index]['dados'] = await this.consultaProgramas();
        } else if (modulo.index === 'conteudos') {
          modulosArray[modulo.index]['dados'] = await this.consultaConteudos();
        } else if (modulo.index === 'personal_online') {
          modulosArray[modulo.index]['dados'] = await this.consultaProfissional();
        }
      })
    );

    this.dados = {
      usuario: await this.consultaCliente(),
      modules: modulosArray
    };
  }


  async consultaCliente() {
    const consultaCliente = await getDocs(collection(this.db, "usuarios"));

    let usuarios: any = [];

    consultaCliente.forEach((doc) => {
      const data = doc.data();
      usuarios.push(data);
    });

    return usuarios;
  }

  async consultaConteudos() {
    const consultaConteudos = await getDocs(collection(this.db, "conteudos"));

    let conteudos: any = [];

    consultaConteudos.forEach((doc) => {
      const data = doc.data();
      conteudos.push(data);
    });

    return conteudos;
  }

  async consultaModulos() {
    const consultaModulos = await getDocs(collection(this.db, "modulos"));

    let modulos: any = [];

    consultaModulos.forEach((doc) => {
      const data = doc.data();
      modulos.push(data);
      console.log(modulos, 'hehehe');
    });

    return modulos;
  }

  async consultaProgramas() {

    const q = query(collection(this.db, "programas"), orderBy('id', 'asc'));

    const consultaProgramas = await getDocs(q);


    let programas: any = [];

    consultaProgramas.forEach((doc) => {
      const data = doc.data();
      programas.push(data);
    });

    return programas;
  }

  async consultaNotificacoes() {
    const consultaNotificacoes = await getDocs(collection(this.db, "notificacoes"));

    let notificacoes: any = [];

    consultaNotificacoes.forEach((doc) => {
      const data = doc.data();
      notificacoes.push(data);
    });

    return notificacoes;
  }

  async consultaProfissional() {
    const q = query(collection(this.db, "personal_online"), orderBy('id', 'asc'));

    const consultaProfissionais = await getDocs(q);


    let profissionais: any = [];

    consultaProfissionais.forEach((doc) => {
      const data = doc.data();
      profissionais.push(data);
    });

    return profissionais;
  }

  async navigateTo(page: any) {
    const toast = await this.toastController.create({
      message: 'Você clicou em ' + page + '!',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    toast.present();
    return page;
  }

}
