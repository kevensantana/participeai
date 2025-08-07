import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ResiduoItem {
  id: string
  tipo: string
  quantidade: number
  nome?: string
}

interface HistoricoItem {
  id: string
  data: string
  itens: ResiduoItem[]
  impactoTotal: any
}

interface TipoResiduoData {
  label: string
  icon: string
  co2: number
  agua: number
  energia: number
  decomposicao: number
  cor: string
}
@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  tabAtiva = "calculadora"
  residuos: ResiduoItem[] = [{ id: "1", tipo: "", quantidade: 0 }]
  impactoTotal: any = null
  historico: HistoricoItem[] = []
  metaMensal = 50
  progressoMeta = 0
  Math = Math 

  tiposResiduos: { [key: string]: TipoResiduoData } = {
    plastico: {
      label: "Plástico",
      icon: "🥤",
      co2: 6.0,
      agua: 185,
      energia: 2.0,
      decomposicao: 450,
      cor: "#ef4444",
    },
    papel: {
      label: "Papel",
      icon: "📄",
      co2: 3.3,
      agua: 20,
      energia: 1.2,
      decomposicao: 30,
      cor: "#eab308",
    },
    vidro: {
      label: "Vidro",
      icon: "🍾",
      co2: 0.8,
      agua: 2,
      energia: 0.3,
      decomposicao: 1000,
      cor: "#22c55e",
    },
    metal: {
      label: "Metal",
      icon: "🥫",
      co2: 9.0,
      agua: 300,
      energia: 3.5,
      decomposicao: 100,
      cor: "#6b7280",
    },
    organico: {
      label: "Orgânico",
      icon: "🍎",
      co2: 0.5,
      agua: 5,
      energia: 0.1,
      decomposicao: 90,
      cor: "#4ade80",
    },
    eletronico: {
      label: "Eletrônico",
      icon: "📱",
      co2: 15.0,
      agua: 500,
      energia: 5.0,
      decomposicao: 1000,
      cor: "#8b5cf6",
    },
    textil: {
      label: "Têxtil",
      icon: "👕",
      co2: 8.5,
      agua: 2700,
      energia: 4.2,
      decomposicao: 200,
      cor: "#ec4899",
    },
    madeira: {
      label: "Madeira",
      icon: "🪵",
      co2: 1.8,
      agua: 15,
      energia: 0.8,
      decomposicao: 365,
      cor: "#d97706",
    },
  }

  setTabAtiva(tab: string): void {
    this.tabAtiva = tab
  }

  getTiposResiduos(): Array<{ key: string; label: string; icon: string }> {
    return Object.entries(this.tiposResiduos).map(([key, data]) => ({
      key,
      label: data.label,
      icon: data.icon,
    }))
  }

  getTipoResiduo(tipo: string): TipoResiduoData | undefined {
    return this.tiposResiduos[tipo]
  }

  adicionarResiduo(): void {
    const novoResiduo: ResiduoItem = {
      id: Date.now().toString(),
      tipo: "",
      quantidade: 0,
    }
    this.residuos.push(novoResiduo)
  }

  removerResiduo(id: string): void {
    if (this.residuos.length > 1) {
      this.residuos = this.residuos.filter((r) => r.id !== id)
    }
  }

  onResiduoChange(): void {
    // Método chamado quando há mudanças nos resíduos
    // Pode ser usado para validações ou cálculos em tempo real
  }

  trackByResiduo(index: number, residuo: ResiduoItem): string {
    return residuo.id
  }

  hasValidResiduos(): boolean {
    return this.residuos.some((r) => r.tipo && r.quantidade > 0)
  }

  getValidResiduos(): ResiduoItem[] {
    return this.residuos.filter((r) => r.tipo && r.quantidade > 0)
  }

  getTotalQuantidade(): number {
    return this.getValidResiduos().reduce((acc, r) => acc + r.quantidade, 0)
  }

  calcularImpacto(): void {
    let totalCO2 = 0
    let totalAgua = 0
    let totalEnergia = 0
    let totalDecomposicao = 0
    const detalhes: any[] = []

    this.residuos.forEach((residuo) => {
      if (residuo.tipo && residuo.quantidade > 0) {
        const dados = this.tiposResiduos[residuo.tipo]
        const co2 = dados.co2 * residuo.quantidade
        const agua = dados.agua * residuo.quantidade
        const energia = dados.energia * residuo.quantidade

        totalCO2 += co2
        totalAgua += agua
        totalEnergia += energia
        totalDecomposicao = Math.max(totalDecomposicao, dados.decomposicao)

        detalhes.push({
          tipo: residuo.tipo,
          quantidade: residuo.quantidade,
          co2,
          agua,
          energia,
          dados,
        })
      }
    })

    this.impactoTotal = {
      co2: totalCO2,
      agua: totalAgua,
      energia: totalEnergia,
      decomposicao: totalDecomposicao,
      detalhes,
      nivel: totalCO2 < 10 ? "baixo" : totalCO2 < 50 ? "medio" : "alto",
    }

    // Adicionar ao histórico
    const novoHistorico: HistoricoItem = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString("pt-BR"),
      itens: [...this.residuos],
      impactoTotal: this.impactoTotal,
    }
    this.historico = [novoHistorico, ...this.historico.slice(0, 9)]

    // Atualizar progresso da meta
    const totalMensal = this.historico.reduce((acc, item) => acc + item.impactoTotal.co2, 0)
    this.progressoMeta = (totalMensal / this.metaMensal) * 100

    // Ir para aba de resultados
    this.setTabAtiva("resultados")
  }

  limparCalculadora(): void {
    this.residuos = [{ id: "1", tipo: "", quantidade: 0 }]
    this.impactoTotal = null
  }

  exportarRelatorio(): void {
    if (!this.impactoTotal) return

        const relatorio = `
    RELATÓRIO DE IMPACTO AMBIENTAL
    Data: ${new Date().toLocaleDateString("pt-BR")}

    RESUMO DO IMPACTO:
    • CO₂ Emitido: ${this.impactoTotal.co2.toFixed(2)} kg
    • Água Consumida: ${this.impactoTotal.agua.toFixed(1)} L
    • Energia Gasta: ${this.impactoTotal.energia.toFixed(1)} kWh
    • Tempo de Decomposição: ${this.impactoTotal.decomposicao} dias

    DETALHAMENTO POR RESÍDUO:
    ${this.impactoTotal.detalhes
      .map(
        (d: any) => `
    • ${this.tiposResiduos[d.tipo].label}: ${d.quantidade}kg
      - CO₂: ${d.co2.toFixed(2)}kg
      - Água: ${d.agua.toFixed(1)}L
      - Energia: ${d.energia.toFixed(1)}kWh
    `,
      )
      .join("")}

    RECOMENDAÇÕES:
    • Considere reduzir o uso de materiais de alto impacto
    • Priorize a reciclagem e reutilização
    • Explore alternativas sustentáveis
      `

    const blob = new Blob([relatorio], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-impacto-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  getEquivalencias(): { carros: string; arvores: string; energia: string } {
    if (!this.impactoTotal) {
      return { carros: "0", arvores: "0", energia: "0" }
    }

    return {
      carros: (this.impactoTotal.co2 / 4.6).toFixed(1),
      arvores: (this.impactoTotal.co2 / 22).toFixed(1),
      energia: (this.impactoTotal.co2 / 0.5).toFixed(1),
    }
  }

  getHistoricoTipos(item: HistoricoItem): number {
    return item.itens.filter((i) => i.tipo).length
  }

  getAlertClass(): string {
    if (this.progressoMeta < 50) return "alert-success"
    if (this.progressoMeta < 100) return "alert-warning"
    return "alert-danger"
  }

  getAlertMessage(): string {
    if (this.progressoMeta < 50) {
      return "Excelente! Você está bem abaixo da sua meta mensal."
    } else if (this.progressoMeta < 100) {
      return "Atenção! Você está se aproximando da sua meta mensal."
    } else {
      return "Meta excedida! Considere reduzir o impacto dos próximos descartes."
    }
  }
}
