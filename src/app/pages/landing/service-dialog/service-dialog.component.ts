import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.css'
})

export class ServiceDialogComponent implements OnInit {
  title = '';
  description = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    const { title, description } = this.getDialogData(this.data.type);
    this.title = title;
    this.description = description;
  }

  getDialogData(type: string): any {
    switch (type) {
      case 'water':
        return {
          title: '💧 Cuide da água como quem cuida da vida!',
          description: `A água é um recurso valioso, e usá-la com consciência faz toda a diferença. Com nossa funcionalidade de gestão inteligente, você poderá inserir seus dados de consumo e obter uma análise clara e personalizada, revelando seus hábitos e ajudando a identificar onde é possível economizar.

          🏠 Seja para residências ou empresas, a plataforma permite acompanhar o uso da água ao longo do tempo, destacando períodos de maior consumo e gerando relatórios automatizados que facilitam a tomada de decisões.

          📌 A proposta é simples: unir tecnologia e conscientização para promover hábitos mais sustentáveis, reduzindo o desperdício e contribuindo para a preservação ambiental.

          👉 Comece agora a monitorar seu consumo e faça da economia de água um hábito inteligente!`,
        };
      case 'energy':
        return {
          title: '⚡ Sua energia, sua escolha consciente!',
          description: `Quer entender melhor como está consumindo energia e como economizar de verdade? Com a nossa ferramenta de gestão, você insere seus próprios dados de consumo e recebe uma análise detalhada, com informações que ajudam a visualizar seus gastos e otimizar o uso da energia no dia a dia.

          📊 A funcionalidade mostra picos de consumo, permite comparações ao longo do tempo e gera relatórios práticos para ajudar na tomada de decisões, seja na sua casa ou na sua empresa.

          🔌 O objetivo é simples e poderoso: transformar o uso de energia em algo mais eficiente, consciente e sustentável, com impacto direto no seu bolso e no planeta.

          👉 Comece agora a entender e controlar seu consumo de energia com responsabilidade!`,
        };
      case 'food':
        return {
          title: '🍎 Do campo à mesa, com menos desperdício e mais propósito!',
          description: `Imagine uma feira virtual onde quem produz e quem consome se conectam diretamente, de forma simples, eficiente e justa. Esse é o pilar Alimento da nossa plataforma: um espaço colaborativo que une distribuidores de todos os portes, incluindo CEASAs e mercados, a restaurantes, padarias, varejistas, ONGs e cooperativas.

          A proposta é clara: reduzir o desperdício de alimentos pós-colheita e dar um novo destino a produtos que, mesmo próximos do vencimento, ainda estão próprios para o consumo.

          🍅 Através de um sistema de leilão inteligente, distribuidores inserem as informações dos produtos disponíveis e os grandes consumidores podem fazer ofertas justas — garantindo preços competitivos e aproveitamento de alimentos que, de outra forma, seriam descartados.

          📦 A plataforma também oferece um estoque virtual dinâmico, alimentado com os dados inseridos pelos participantes. Isso permite organizar e visualizar excedentes em tempo real, facilitando negociações rápidas e transparentes.

          🤝 Tudo isso com validação mútua entre as partes, promovendo eficiência na cadeia de abastecimento, mais economia para quem compra e menos desperdício para o planeta.

          👉 Participe dessa nova forma de conectar quem tem com quem precisa — e ajude a transformar o futuro da alimentação!`,
        };
      case 'residue':
        return {
          title: '♻️ Transforme seu descarte em impacto positivo! 🌱',
          description:  `Você já se perguntou para onde vai o lixo depois que sai da sua casa? A gestão de resíduos pode parecer invisível, mas é um dos maiores desafios das cidades hoje em dia. Pensando nisso, criamos uma solução que une tecnologia + educação ambiental para tornar o descarte correto algo simples, acessível e até divertido!

          🗺️ Com nosso mapa interativo, você encontra com facilidade os pontos de coleta mais próximos para qualquer tipo de resíduo — seja reciclável, eletrônico, orgânico ou até aquele objeto que você nem sabia que podia ser reaproveitado.

          📍Viu um lugar que deveria ter um ponto de descarte? Sugira diretamente pela plataforma e ajude a melhorar sua cidade!

          📚 Aprenda de forma leve e contínua com nosso sistema educacional integrado: dicas práticas de reutilização, curiosidades sobre reciclagem, e ideias para deixar seu dia a dia mais sustentável.

          🌍 E o mais legal: com a calculadora de impacto ambiental, você pode visualizar como suas ações estão contribuindo para um planeta mais limpo. Descubra o poder de uma atitude consciente!

          Essa funcionalidade não é só sobre jogar o lixo fora — é sobre criar uma rede colaborativa por um futuro mais verde. Venha fazer parte dessa mudança!

          👉 Explore agora e repense o destino do seu lixo!`,
        };
      case 'learn-more':
        return {
          title: 'Você no controle do que realmente importa!',
          description:  `Já imaginou controlar seu consumo de água, energia, alimentos e até resíduos… tudo em um só lugar? Não estamos falando do futuro — isso já é possível com o Participe.ai, uma plataforma inteligente feita para quem quer viver com mais consciência, praticidade e impacto positivo no mundo!

          🔍 Chega de informações espalhadas, soluções complicadas e desperdícios desnecessários. O Participe.ai centraliza o que você precisa para economizar, acompanhar seu uso diário e tomar decisões mais sustentáveis — seja em casa ou na sua empresa.

          💧⚡🍎♻️ A plataforma funciona com quatro pilares essenciais:

          Água e Energia: monitore seu consumo com clareza e receba relatórios personalizados.

          Alimento: conecte produtores e grandes consumidores para reduzir o desperdício e valorizar a produção local.

          Resíduos: aprenda a descartar corretamente com um mapa interativo e calcule seu impacto ambiental.

          🎮 Tudo isso com conteúdos educativos e dicas práticas, para transformar pequenas atitudes em grandes conquistas sustentáveis.

          💚 Se você acredita que mudar o mundo começa mudando sua rotina, essa é a sua chance de fazer parte.
          Participe da revolução verde digital!`,
        };
      default:
        return {
          title: 'Serviço',
          description: 'Informações não disponíveis.',
        };
    }
  }
}
