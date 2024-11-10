import { Component, OnInit, Input } from '@angular/core';

interface Modulo {
  label: string;
  tipo: string;
  status: string;
}

interface ModuloComDados {
  modulo: Modulo;
  dados: { id: string; imagem: string; nome: string; status: string; especialidade: string}[];
}

interface Dados {
  modules: {
    personal_online: ModuloComDados;
    programas: ModuloComDados;
    conteudos: ModuloComDados;
  };
}

@Component({
  selector: 'app-sessao-cards',
  templateUrl: './sessao-cards.component.html',
  styleUrls: ['./sessao-cards.component.scss'],
})
export class SessaoCardsComponent implements OnInit {
  @Input() dados: Dados = {
    modules: {
      personal_online: { modulo: { label: '', tipo: '', status: '' }, dados: [] },
      programas: { modulo: { label: '', tipo: '', status: '' }, dados: [] },
      conteudos: { modulo: { label: '', tipo: '', status: '' }, dados: [] },
    },
  };

  constructor() {}

  ngOnInit() {}
}
