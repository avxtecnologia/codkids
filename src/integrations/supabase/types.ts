export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      Atendimento: {
        Row: {
          assunto: string | null
          atendimento_Reaberto: boolean | null
          created_at: string
          data_Abertura: string | null
          data_Fechamento: string | null
          data_Reabertura: string | null
          id: number
          motivo_Fechamento: string | null
          motivo_Reabertura: string | null
          nome_Atendente: string | null
          nome_Cliente: string | null
          num_Ticket: string
          status_Atendimento: string | null
        }
        Insert: {
          assunto?: string | null
          atendimento_Reaberto?: boolean | null
          created_at?: string
          data_Abertura?: string | null
          data_Fechamento?: string | null
          data_Reabertura?: string | null
          id?: number
          motivo_Fechamento?: string | null
          motivo_Reabertura?: string | null
          nome_Atendente?: string | null
          nome_Cliente?: string | null
          num_Ticket: string
          status_Atendimento?: string | null
        }
        Update: {
          assunto?: string | null
          atendimento_Reaberto?: boolean | null
          created_at?: string
          data_Abertura?: string | null
          data_Fechamento?: string | null
          data_Reabertura?: string | null
          id?: number
          motivo_Fechamento?: string | null
          motivo_Reabertura?: string | null
          nome_Atendente?: string | null
          nome_Cliente?: string | null
          num_Ticket?: string
          status_Atendimento?: string | null
        }
        Relationships: []
      }
      atendimentos: {
        Row: {
          aberto_por_id: string | null
          aberto_por_nome: string | null
          assunto: string | null
          atribuido_a_id: string | null
          atribuido_a_nome: string | null
          cliente_id: string | null
          cliente_nome: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          data_abertura: string | null
          data_fechamento: string | null
          descricao: string | null
          id: string
          notas_fechamento: string | null
          numero_ticket: string
          prioridade: string | null
          status: string | null
          status_final: string | null
          tempo_resolucao_minutos: number | null
          tipo_assunto: string | null
          ultimo_dialogo_em: string | null
          updated_date: string | null
        }
        Insert: {
          aberto_por_id?: string | null
          aberto_por_nome?: string | null
          assunto?: string | null
          atribuido_a_id?: string | null
          atribuido_a_nome?: string | null
          cliente_id?: string | null
          cliente_nome?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          descricao?: string | null
          id: string
          notas_fechamento?: string | null
          numero_ticket: string
          prioridade?: string | null
          status?: string | null
          status_final?: string | null
          tempo_resolucao_minutos?: number | null
          tipo_assunto?: string | null
          ultimo_dialogo_em?: string | null
          updated_date?: string | null
        }
        Update: {
          aberto_por_id?: string | null
          aberto_por_nome?: string | null
          assunto?: string | null
          atribuido_a_id?: string | null
          atribuido_a_nome?: string | null
          cliente_id?: string | null
          cliente_nome?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          descricao?: string | null
          id?: string
          notas_fechamento?: string | null
          numero_ticket?: string
          prioridade?: string | null
          status?: string | null
          status_final?: string | null
          tempo_resolucao_minutos?: number | null
          tipo_assunto?: string | null
          ultimo_dialogo_em?: string | null
          updated_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          acao: string
          created_date: string
          detalhes: Json | null
          id: string
          modulo: string
          registro_descricao: string | null
          registro_id: string | null
          user_id: string
          user_name: string
        }
        Insert: {
          acao: string
          created_date?: string
          detalhes?: Json | null
          id?: string
          modulo: string
          registro_descricao?: string | null
          registro_id?: string | null
          user_id: string
          user_name: string
        }
        Update: {
          acao?: string
          created_date?: string
          detalhes?: Json | null
          id?: string
          modulo?: string
          registro_descricao?: string | null
          registro_id?: string | null
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      cliente_antivirus: {
        Row: {
          antivirus_nome: string | null
          cliente_id: string
          created_date: string | null
          data_expiracao: string | null
          id: string
          nome_estacao: string
          updated_date: string | null
        }
        Insert: {
          antivirus_nome?: string | null
          cliente_id: string
          created_date?: string | null
          data_expiracao?: string | null
          id?: string
          nome_estacao: string
          updated_date?: string | null
        }
        Update: {
          antivirus_nome?: string | null
          cliente_id?: string
          created_date?: string | null
          data_expiracao?: string | null
          id?: string
          nome_estacao?: string
          updated_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cliente_antivirus_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      cliente_arquivos: {
        Row: {
          cliente_id: string
          created_date: string | null
          descricao: string | null
          id: string
          nome_arquivo: string
          tamanho_bytes: number | null
          tipo_arquivo: string | null
          uploaded_by_id: string | null
          uploaded_by_nome: string | null
          url: string
        }
        Insert: {
          cliente_id: string
          created_date?: string | null
          descricao?: string | null
          id?: string
          nome_arquivo: string
          tamanho_bytes?: number | null
          tipo_arquivo?: string | null
          uploaded_by_id?: string | null
          uploaded_by_nome?: string | null
          url: string
        }
        Update: {
          cliente_id?: string
          created_date?: string | null
          descricao?: string | null
          id?: string
          nome_arquivo?: string
          tamanho_bytes?: number | null
          tipo_arquivo?: string | null
          uploaded_by_id?: string | null
          uploaded_by_nome?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "cliente_arquivos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      cliente_laudos: {
        Row: {
          cliente_id: string
          conteudo: string | null
          created_by_id: string | null
          created_by_nome: string | null
          created_date: string | null
          id: string
          titulo: string
          updated_date: string | null
        }
        Insert: {
          cliente_id: string
          conteudo?: string | null
          created_by_id?: string | null
          created_by_nome?: string | null
          created_date?: string | null
          id?: string
          titulo: string
          updated_date?: string | null
        }
        Update: {
          cliente_id?: string
          conteudo?: string | null
          created_by_id?: string | null
          created_by_nome?: string | null
          created_date?: string | null
          id?: string
          titulo?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      cliente_pendencias: {
        Row: {
          cliente_id: string
          concluida: boolean
          created_by_id: string | null
          created_by_nome: string | null
          created_date: string | null
          data_conclusao: string | null
          data_prazo: string | null
          descricao: string
          id: string
          updated_date: string | null
        }
        Insert: {
          cliente_id: string
          concluida?: boolean
          created_by_id?: string | null
          created_by_nome?: string | null
          created_date?: string | null
          data_conclusao?: string | null
          data_prazo?: string | null
          descricao: string
          id?: string
          updated_date?: string | null
        }
        Update: {
          cliente_id?: string
          concluida?: boolean
          created_by_id?: string | null
          created_by_nome?: string | null
          created_date?: string | null
          data_conclusao?: string | null
          data_prazo?: string | null
          descricao?: string
          id?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          antivirus_data_expiracao: string | null
          antivirus_nome: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          contato_principal_email: string | null
          contato_principal_idgrupo: string | null
          contato_principal_nome: string | null
          contato_principal_telefone: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          endereco: string | null
          estado: string | null
          id: string
          info_servidor: string | null
          nome_fantasia: string | null
          possui_backup: boolean | null
          razao_social: string | null
          status: string | null
          updated_date: string | null
          usa_antivirus: boolean | null
          usa_sistema_vr: boolean | null
        }
        Insert: {
          antivirus_data_expiracao?: string | null
          antivirus_nome?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          contato_principal_email?: string | null
          contato_principal_idgrupo?: string | null
          contato_principal_nome?: string | null
          contato_principal_telefone?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          endereco?: string | null
          estado?: string | null
          id: string
          info_servidor?: string | null
          nome_fantasia?: string | null
          possui_backup?: boolean | null
          razao_social?: string | null
          status?: string | null
          updated_date?: string | null
          usa_antivirus?: boolean | null
          usa_sistema_vr?: boolean | null
        }
        Update: {
          antivirus_data_expiracao?: string | null
          antivirus_nome?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          contato_principal_email?: string | null
          contato_principal_idgrupo?: string | null
          contato_principal_nome?: string | null
          contato_principal_telefone?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          info_servidor?: string | null
          nome_fantasia?: string | null
          possui_backup?: boolean | null
          razao_social?: string | null
          status?: string | null
          updated_date?: string | null
          usa_antivirus?: boolean | null
          usa_sistema_vr?: boolean | null
        }
        Relationships: []
      }
      clientes_vr: {
        Row: {
          conversa: string | null
          created_at: string
          id: number
          nomecli: string | null
          telefone: string | null
        }
        Insert: {
          conversa?: string | null
          created_at?: string
          id?: number
          nomecli?: string | null
          telefone?: string | null
        }
        Update: {
          conversa?: string | null
          created_at?: string
          id?: number
          nomecli?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      conversas_grupo: {
        Row: {
          conteudo: string | null
          created_at: string | null
          enviado: boolean | null
          grupo_id: string
          id: string
          messagetype: string | null
          participante: string
          participanteNome: string | null
        }
        Insert: {
          conteudo?: string | null
          created_at?: string | null
          enviado?: boolean | null
          grupo_id: string
          id?: string
          messagetype?: string | null
          participante: string
          participanteNome?: string | null
        }
        Update: {
          conteudo?: string | null
          created_at?: string | null
          enviado?: boolean | null
          grupo_id?: string
          id?: string
          messagetype?: string | null
          participante?: string
          participanteNome?: string | null
        }
        Relationships: []
      }
      dadosClientes: {
        Row: {
          Antivirus: boolean | null
          antivirusEstacao: string | null
          antivirusServidor: string | null
          CNPJ: string | null
          created_at: string
          dataInstalacaoAntivirus: string | null
          dataVencimentoAntivirus: string | null
          groupJid: string | null
          id: number
          login_name: string | null
          Nome: string | null
        }
        Insert: {
          Antivirus?: boolean | null
          antivirusEstacao?: string | null
          antivirusServidor?: string | null
          CNPJ?: string | null
          created_at?: string
          dataInstalacaoAntivirus?: string | null
          dataVencimentoAntivirus?: string | null
          groupJid?: string | null
          id?: number
          login_name?: string | null
          Nome?: string | null
        }
        Update: {
          Antivirus?: boolean | null
          antivirusEstacao?: string | null
          antivirusServidor?: string | null
          CNPJ?: string | null
          created_at?: string
          dataInstalacaoAntivirus?: string | null
          dataVencimentoAntivirus?: string | null
          groupJid?: string | null
          id?: number
          login_name?: string | null
          Nome?: string | null
        }
        Relationships: []
      }
      dialogos: {
        Row: {
          arquivos: Json | null
          atendimento_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          mensagem: string | null
          updated_date: string | null
          usuario_id: string | null
          usuario_nome: string | null
          usuario_tipo: string | null
        }
        Insert: {
          arquivos?: Json | null
          atendimento_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          mensagem?: string | null
          updated_date?: string | null
          usuario_id?: string | null
          usuario_nome?: string | null
          usuario_tipo?: string | null
        }
        Update: {
          arquivos?: Json | null
          atendimento_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          mensagem?: string | null
          updated_date?: string | null
          usuario_id?: string | null
          usuario_nome?: string | null
          usuario_tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dialogos_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
        ]
      }
      fin_assinaturas: {
        Row: {
          asaas_id: string | null
          ciclo: string
          cliente_nome: string
          created_by_id: string | null
          created_date: string | null
          data_fim: string | null
          data_inicio: string
          descricao: string | null
          forma_pagamento: string | null
          id: string
          status: string
          updated_date: string | null
          valor: number
        }
        Insert: {
          asaas_id?: string | null
          ciclo?: string
          cliente_nome: string
          created_by_id?: string | null
          created_date?: string | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          status?: string
          updated_date?: string | null
          valor?: number
        }
        Update: {
          asaas_id?: string | null
          ciclo?: string
          cliente_nome?: string
          created_by_id?: string | null
          created_date?: string | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          status?: string
          updated_date?: string | null
          valor?: number
        }
        Relationships: []
      }
      fin_categorias: {
        Row: {
          created_by_id: string | null
          created_date: string | null
          id: string
          nome: string
        }
        Insert: {
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      fin_cobrancas: {
        Row: {
          asaas_id: string | null
          created_by_id: string | null
          created_date: string | null
          data_vencimento: string
          descricao: string | null
          forma_pagamento: string | null
          id: string
          nome_cliente: string
          numero_parcela: number | null
          parcelamento_id: string | null
          status: string
          tipo: string
          total_parcelas: number | null
          updated_date: string | null
          valor: number
        }
        Insert: {
          asaas_id?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_vencimento: string
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          nome_cliente: string
          numero_parcela?: number | null
          parcelamento_id?: string | null
          status?: string
          tipo?: string
          total_parcelas?: number | null
          updated_date?: string | null
          valor?: number
        }
        Update: {
          asaas_id?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_vencimento?: string
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          nome_cliente?: string
          numero_parcela?: number | null
          parcelamento_id?: string | null
          status?: string
          tipo?: string
          total_parcelas?: number | null
          updated_date?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "fin_cobrancas_parcelamento_id_fkey"
            columns: ["parcelamento_id"]
            isOneToOne: false
            referencedRelation: "fin_parcelamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      fin_contas_pagar: {
        Row: {
          categoria: string | null
          created_by_id: string | null
          created_date: string | null
          data_pagamento: string | null
          data_vencimento: string
          descricao: string
          fornecedor: string | null
          id: string
          status: string
          updated_date: string | null
          valor: number
        }
        Insert: {
          categoria?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          descricao: string
          fornecedor?: string | null
          id?: string
          status?: string
          updated_date?: string | null
          valor?: number
        }
        Update: {
          categoria?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string
          fornecedor?: string | null
          id?: string
          status?: string
          updated_date?: string | null
          valor?: number
        }
        Relationships: []
      }
      fin_fornecedores: {
        Row: {
          created_by_id: string | null
          created_date: string | null
          id: string
          nome: string
        }
        Insert: {
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      fin_notas_fiscais: {
        Row: {
          cliente_nome: string
          created_by_id: string | null
          created_date: string | null
          data_emissao: string
          id: string
          numero: string
          status: string
          updated_date: string | null
          url_pdf: string | null
          valor: number
        }
        Insert: {
          cliente_nome: string
          created_by_id?: string | null
          created_date?: string | null
          data_emissao?: string
          id?: string
          numero: string
          status?: string
          updated_date?: string | null
          url_pdf?: string | null
          valor?: number
        }
        Update: {
          cliente_nome?: string
          created_by_id?: string | null
          created_date?: string | null
          data_emissao?: string
          id?: string
          numero?: string
          status?: string
          updated_date?: string | null
          url_pdf?: string | null
          valor?: number
        }
        Relationships: []
      }
      fin_parcelamentos: {
        Row: {
          asaas_id: string | null
          cliente_nome: string
          created_by_id: string | null
          created_date: string | null
          descricao: string | null
          forma_pagamento: string | null
          id: string
          total_parcelas: number
          updated_date: string | null
          valor_parcela: number
          valor_total: number
        }
        Insert: {
          asaas_id?: string | null
          cliente_nome: string
          created_by_id?: string | null
          created_date?: string | null
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          total_parcelas?: number
          updated_date?: string | null
          valor_parcela?: number
          valor_total?: number
        }
        Update: {
          asaas_id?: string | null
          cliente_nome?: string
          created_by_id?: string | null
          created_date?: string | null
          descricao?: string | null
          forma_pagamento?: string | null
          id?: string
          total_parcelas?: number
          updated_date?: string | null
          valor_parcela?: number
          valor_total?: number
        }
        Relationships: []
      }
      fin_pix: {
        Row: {
          chave_pix: string | null
          created_by_id: string | null
          created_date: string | null
          data: string
          descricao: string | null
          id: string
          status: string
          tipo: string
          updated_date: string | null
          valor: number
        }
        Insert: {
          chave_pix?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data?: string
          descricao?: string | null
          id?: string
          status?: string
          tipo?: string
          updated_date?: string | null
          valor?: number
        }
        Update: {
          chave_pix?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data?: string
          descricao?: string | null
          id?: string
          status?: string
          tipo?: string
          updated_date?: string | null
          valor?: number
        }
        Relationships: []
      }
      fin_pix_favoritos: {
        Row: {
          chave_pix: string
          created_by_id: string | null
          created_date: string | null
          id: string
          nome: string
          tipo_chave: string
          updated_date: string | null
        }
        Insert: {
          chave_pix: string
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome: string
          tipo_chave?: string
          updated_date?: string | null
        }
        Update: {
          chave_pix?: string
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          nome?: string
          tipo_chave?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      Financeiro: {
        Row: {
          categoria: string | null
          created_at: string
          data: string | null
          descricao: string | null
          id: number
          status: boolean | null
          tipo: string | null
          valor: string | null
        }
        Insert: {
          categoria?: string | null
          created_at?: string
          data?: string | null
          descricao?: string | null
          id?: number
          status?: boolean | null
          tipo?: string | null
          valor?: string | null
        }
        Update: {
          categoria?: string | null
          created_at?: string
          data?: string | null
          descricao?: string | null
          id?: number
          status?: boolean | null
          tipo?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      grupos_liberados: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Relationships: []
      }
      hotspot_clientes: {
        Row: {
          "cnpj loja": string | null
          created_at: string
          criado_em: string | null
          id: number
          mac: string | null
          "nome cliente": string | null
          "nome loja": string | null
          origem: string | null
          telefone: string | null
        }
        Insert: {
          "cnpj loja"?: string | null
          created_at?: string
          criado_em?: string | null
          id?: number
          mac?: string | null
          "nome cliente"?: string | null
          "nome loja"?: string | null
          origem?: string | null
          telefone?: string | null
        }
        Update: {
          "cnpj loja"?: string | null
          created_at?: string
          criado_em?: string | null
          id?: number
          mac?: string | null
          "nome cliente"?: string | null
          "nome loja"?: string | null
          origem?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      hotspot_lojas: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          cnpj: string
          criado_em: string | null
          id: string
          mensagem_boas_vindas: string | null
          nome_fantasia: string
          numero_whatsapp: string | null
          token_uazapi: string | null
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cnpj: string
          criado_em?: string | null
          id?: string
          mensagem_boas_vindas?: string | null
          nome_fantasia: string
          numero_whatsapp?: string | null
          token_uazapi?: string | null
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cnpj?: string
          criado_em?: string | null
          id?: string
          mensagem_boas_vindas?: string | null
          nome_fantasia?: string
          numero_whatsapp?: string | null
          token_uazapi?: string | null
        }
        Relationships: []
      }
      hotspot_promocao_produtos: {
        Row: {
          cnpj_loja: string
          codigo_barras: string | null
          criado_em: string | null
          id: string
          nome_produto: string
          preco_original: number | null
          preco_promocional: number
          promocao_id: string
        }
        Insert: {
          cnpj_loja: string
          codigo_barras?: string | null
          criado_em?: string | null
          id?: string
          nome_produto: string
          preco_original?: number | null
          preco_promocional: number
          promocao_id: string
        }
        Update: {
          cnpj_loja?: string
          codigo_barras?: string | null
          criado_em?: string | null
          id?: string
          nome_produto?: string
          preco_original?: number | null
          preco_promocional?: number
          promocao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotspot_promocao_produtos_promocao_id_fkey"
            columns: ["promocao_id"]
            isOneToOne: false
            referencedRelation: "hotspot_promocoes"
            referencedColumns: ["id"]
          },
        ]
      }
      hotspot_promocoes: {
        Row: {
          ativa: boolean | null
          cnpj_loja: string
          criado_em: string | null
          data_fim: string | null
          data_inicio: string | null
          desconto: string | null
          descricao: string | null
          encarte_tipo: string | null
          encarte_url: string | null
          id: string
          produto: string | null
          tipo: string
          titulo: string
        }
        Insert: {
          ativa?: boolean | null
          cnpj_loja: string
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          desconto?: string | null
          descricao?: string | null
          encarte_tipo?: string | null
          encarte_url?: string | null
          id?: string
          produto?: string | null
          tipo?: string
          titulo: string
        }
        Update: {
          ativa?: boolean | null
          cnpj_loja?: string
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          desconto?: string | null
          descricao?: string | null
          encarte_tipo?: string | null
          encarte_url?: string | null
          id?: string
          produto?: string | null
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotspot_promocoes_cnpj_loja_fkey"
            columns: ["cnpj_loja"]
            isOneToOne: false
            referencedRelation: "hotspot_lojas"
            referencedColumns: ["cnpj"]
          },
        ]
      }
      hotspot_usuarios: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          loja_cnpj: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          loja_cnpj?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          loja_cnpj?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotspot_usuarios_loja_cnpj_fkey"
            columns: ["loja_cnpj"]
            isOneToOne: false
            referencedRelation: "hotspot_lojas"
            referencedColumns: ["cnpj"]
          },
        ]
      }
      ncm: {
        Row: {
          datainicio: string | null
          datatermino: string | null
          descricao: string | null
          id: number
          id_codigogia: number | null
          id_codigogiava: number | null
          id_codigogiavb: number | null
          id_situacaocadastro: number | null
          ncm1: number | null
          ncm2: number | null
          ncm3: number | null
          nivel: number | null
        }
        Insert: {
          datainicio?: string | null
          datatermino?: string | null
          descricao?: string | null
          id: number
          id_codigogia?: number | null
          id_codigogiava?: number | null
          id_codigogiavb?: number | null
          id_situacaocadastro?: number | null
          ncm1?: number | null
          ncm2?: number | null
          ncm3?: number | null
          nivel?: number | null
        }
        Update: {
          datainicio?: string | null
          datatermino?: string | null
          descricao?: string | null
          id?: number
          id_codigogia?: number | null
          id_codigogiava?: number | null
          id_codigogiavb?: number | null
          id_situacaocadastro?: number | null
          ncm1?: number | null
          ncm2?: number | null
          ncm3?: number | null
          nivel?: number | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          data_compra: string | null
          data_validade: string | null
          descricao: string | null
          id: string
          nome: string
          periodo: string | null
          quantidade_estoque: number | null
          status: string | null
          tipo: string | null
          updated_date: string | null
          valor: number | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_compra?: string | null
          data_validade?: string | null
          descricao?: string | null
          id: string
          nome: string
          periodo?: string | null
          quantidade_estoque?: number | null
          status?: string | null
          tipo?: string | null
          updated_date?: string | null
          valor?: number | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          data_compra?: string | null
          data_validade?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          periodo?: string | null
          quantidade_estoque?: number | null
          status?: string | null
          tipo?: string | null
          updated_date?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      produtos_vr: {
        Row: {
          aceitamultiplicacaopdv: number | null
          alteradopaf: number | null
          alturaembalagem: number | null
          camadas: number | null
          cestabasica: number | null
          codigoanp: string | null
          codigoanvisa: string | null
          comprimentoembalagem: number | null
          conferido: number | null
          consignado: number | null
          controlepoliciacivil: number | null
          custofinal: number | null
          dataalteracao: string | null
          datacadastro: string | null
          ddv: string | null
          desativarenviomasterfiscobrasil: number | null
          descontomaximo: number | null
          descricaocompleta: string | null
          descricaogondola: string | null
          descricaoreduzida: string | null
          excecaotipi: number | null
          id: number
          id_cest: number | null
          id_codigoanp: number | null
          id_codigogia: string | null
          id_comprador: number | null
          id_divisaofornecedor: number | null
          id_familiaproduto: number | null
          id_fornecedorfabricante: number | null
          id_marca: number | null
          id_normacompra: number | null
          id_produtovasilhame: number | null
          id_servico: number | null
          id_tipocompra: number | null
          id_tipoembalagem: number | null
          id_tipoembalagemvolume: number | null
          id_tipolocaltroca: number | null
          id_tipomercadoria: number | null
          id_tipoorigemmercadoria: number | null
          id_tipoorigemmercadoriaentrada: number | null
          id_tipopiscofins: number | null
          id_tipopiscofinscredito: number | null
          impostomedioestadual: number | null
          impostomedioimportado: number | null
          impostomedionacional: number | null
          ipi: number | null
          isentoanvisa: number | null
          larguraembalagem: number | null
          lastro: number | null
          mercadologico1: number | null
          mercadologico2: number | null
          mercadologico3: number | null
          mercadologico4: number | null
          mercadologico5: number | null
          motivoisencaoanvisa: string | null
          ncm1: string | null
          ncm2: string | null
          ncm3: string | null
          numeroparcela: number | null
          operacaoprodutoperfumariape: number | null
          percentualencargo: number | null
          percentualfrete: number | null
          percentualipi: number | null
          percentualperda: number | null
          percentualsubstituicao: number | null
          percentualtoleranciaselfcheckout: number | null
          perda: number | null
          permitedescontopdv: number | null
          permiteperda: number | null
          permitequebra: number | null
          permitetroca: number | null
          pesavel: number | null
          pesobruto: number | null
          pesoliquido: number | null
          precomaximoconsumidoranvisa: number | null
          produtoassessorado: number | null
          produtoecommerce: number | null
          produtoincentivado: number | null
          promocaoauditada: number | null
          qtddiasminimovalidade: number | null
          qtdembalagem: number | null
          sazonal: number | null
          substituicaoestadual: number | null
          substituicaoestadualexterior: number | null
          substituicaoestadualoutros: number | null
          sugestaocotacao: number | null
          sugestaopedido: number | null
          tara: number | null
          temperatura: string | null
          tiponaturezareceita: string | null
          utilizatabelasubstituicaotributaria: number | null
          utilizavalidadeentrada: number | null
          vendacontrolada: number | null
          vendapdv: number | null
          verificacustotabela: number | null
          verificapesopdv: number | null
          volume: number | null
        }
        Insert: {
          aceitamultiplicacaopdv?: number | null
          alteradopaf?: number | null
          alturaembalagem?: number | null
          camadas?: number | null
          cestabasica?: number | null
          codigoanp?: string | null
          codigoanvisa?: string | null
          comprimentoembalagem?: number | null
          conferido?: number | null
          consignado?: number | null
          controlepoliciacivil?: number | null
          custofinal?: number | null
          dataalteracao?: string | null
          datacadastro?: string | null
          ddv?: string | null
          desativarenviomasterfiscobrasil?: number | null
          descontomaximo?: number | null
          descricaocompleta?: string | null
          descricaogondola?: string | null
          descricaoreduzida?: string | null
          excecaotipi?: number | null
          id: number
          id_cest?: number | null
          id_codigoanp?: number | null
          id_codigogia?: string | null
          id_comprador?: number | null
          id_divisaofornecedor?: number | null
          id_familiaproduto?: number | null
          id_fornecedorfabricante?: number | null
          id_marca?: number | null
          id_normacompra?: number | null
          id_produtovasilhame?: number | null
          id_servico?: number | null
          id_tipocompra?: number | null
          id_tipoembalagem?: number | null
          id_tipoembalagemvolume?: number | null
          id_tipolocaltroca?: number | null
          id_tipomercadoria?: number | null
          id_tipoorigemmercadoria?: number | null
          id_tipoorigemmercadoriaentrada?: number | null
          id_tipopiscofins?: number | null
          id_tipopiscofinscredito?: number | null
          impostomedioestadual?: number | null
          impostomedioimportado?: number | null
          impostomedionacional?: number | null
          ipi?: number | null
          isentoanvisa?: number | null
          larguraembalagem?: number | null
          lastro?: number | null
          mercadologico1?: number | null
          mercadologico2?: number | null
          mercadologico3?: number | null
          mercadologico4?: number | null
          mercadologico5?: number | null
          motivoisencaoanvisa?: string | null
          ncm1?: string | null
          ncm2?: string | null
          ncm3?: string | null
          numeroparcela?: number | null
          operacaoprodutoperfumariape?: number | null
          percentualencargo?: number | null
          percentualfrete?: number | null
          percentualipi?: number | null
          percentualperda?: number | null
          percentualsubstituicao?: number | null
          percentualtoleranciaselfcheckout?: number | null
          perda?: number | null
          permitedescontopdv?: number | null
          permiteperda?: number | null
          permitequebra?: number | null
          permitetroca?: number | null
          pesavel?: number | null
          pesobruto?: number | null
          pesoliquido?: number | null
          precomaximoconsumidoranvisa?: number | null
          produtoassessorado?: number | null
          produtoecommerce?: number | null
          produtoincentivado?: number | null
          promocaoauditada?: number | null
          qtddiasminimovalidade?: number | null
          qtdembalagem?: number | null
          sazonal?: number | null
          substituicaoestadual?: number | null
          substituicaoestadualexterior?: number | null
          substituicaoestadualoutros?: number | null
          sugestaocotacao?: number | null
          sugestaopedido?: number | null
          tara?: number | null
          temperatura?: string | null
          tiponaturezareceita?: string | null
          utilizatabelasubstituicaotributaria?: number | null
          utilizavalidadeentrada?: number | null
          vendacontrolada?: number | null
          vendapdv?: number | null
          verificacustotabela?: number | null
          verificapesopdv?: number | null
          volume?: number | null
        }
        Update: {
          aceitamultiplicacaopdv?: number | null
          alteradopaf?: number | null
          alturaembalagem?: number | null
          camadas?: number | null
          cestabasica?: number | null
          codigoanp?: string | null
          codigoanvisa?: string | null
          comprimentoembalagem?: number | null
          conferido?: number | null
          consignado?: number | null
          controlepoliciacivil?: number | null
          custofinal?: number | null
          dataalteracao?: string | null
          datacadastro?: string | null
          ddv?: string | null
          desativarenviomasterfiscobrasil?: number | null
          descontomaximo?: number | null
          descricaocompleta?: string | null
          descricaogondola?: string | null
          descricaoreduzida?: string | null
          excecaotipi?: number | null
          id?: number
          id_cest?: number | null
          id_codigoanp?: number | null
          id_codigogia?: string | null
          id_comprador?: number | null
          id_divisaofornecedor?: number | null
          id_familiaproduto?: number | null
          id_fornecedorfabricante?: number | null
          id_marca?: number | null
          id_normacompra?: number | null
          id_produtovasilhame?: number | null
          id_servico?: number | null
          id_tipocompra?: number | null
          id_tipoembalagem?: number | null
          id_tipoembalagemvolume?: number | null
          id_tipolocaltroca?: number | null
          id_tipomercadoria?: number | null
          id_tipoorigemmercadoria?: number | null
          id_tipoorigemmercadoriaentrada?: number | null
          id_tipopiscofins?: number | null
          id_tipopiscofinscredito?: number | null
          impostomedioestadual?: number | null
          impostomedioimportado?: number | null
          impostomedionacional?: number | null
          ipi?: number | null
          isentoanvisa?: number | null
          larguraembalagem?: number | null
          lastro?: number | null
          mercadologico1?: number | null
          mercadologico2?: number | null
          mercadologico3?: number | null
          mercadologico4?: number | null
          mercadologico5?: number | null
          motivoisencaoanvisa?: string | null
          ncm1?: string | null
          ncm2?: string | null
          ncm3?: string | null
          numeroparcela?: number | null
          operacaoprodutoperfumariape?: number | null
          percentualencargo?: number | null
          percentualfrete?: number | null
          percentualipi?: number | null
          percentualperda?: number | null
          percentualsubstituicao?: number | null
          percentualtoleranciaselfcheckout?: number | null
          perda?: number | null
          permitedescontopdv?: number | null
          permiteperda?: number | null
          permitequebra?: number | null
          permitetroca?: number | null
          pesavel?: number | null
          pesobruto?: number | null
          pesoliquido?: number | null
          precomaximoconsumidoranvisa?: number | null
          produtoassessorado?: number | null
          produtoecommerce?: number | null
          produtoincentivado?: number | null
          promocaoauditada?: number | null
          qtddiasminimovalidade?: number | null
          qtdembalagem?: number | null
          sazonal?: number | null
          substituicaoestadual?: number | null
          substituicaoestadualexterior?: number | null
          substituicaoestadualoutros?: number | null
          sugestaocotacao?: number | null
          sugestaopedido?: number | null
          tara?: number | null
          temperatura?: string | null
          tiponaturezareceita?: string | null
          utilizatabelasubstituicaotributaria?: number | null
          utilizavalidadeentrada?: number | null
          vendacontrolada?: number | null
          vendapdv?: number | null
          verificacustotabela?: number | null
          verificapesopdv?: number | null
          volume?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          app_origin: string | null
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          app_origin?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          app_origin?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proposta_items: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          desconto_percentual: number | null
          id: string
          periodo: string | null
          produto_descricao: string | null
          produto_id: string | null
          produto_nome: string | null
          produto_tipo: string | null
          proposta_id: string | null
          quantidade: number | null
          updated_date: string | null
          valor_desconto: number | null
          valor_total: number | null
          valor_unitario: number | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          desconto_percentual?: number | null
          id: string
          periodo?: string | null
          produto_descricao?: string | null
          produto_id?: string | null
          produto_nome?: string | null
          produto_tipo?: string | null
          proposta_id?: string | null
          quantidade?: number | null
          updated_date?: string | null
          valor_desconto?: number | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          desconto_percentual?: number | null
          id?: string
          periodo?: string | null
          produto_descricao?: string | null
          produto_id?: string | null
          produto_nome?: string | null
          produto_tipo?: string | null
          proposta_id?: string | null
          quantidade?: number | null
          updated_date?: string | null
          valor_desconto?: number | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "proposta_items_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposta_items_proposta_id_fkey"
            columns: ["proposta_id"]
            isOneToOne: false
            referencedRelation: "propostas"
            referencedColumns: ["id"]
          },
        ]
      }
      propostas: {
        Row: {
          cliente_id: string | null
          cliente_nome: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          criado_por_id: string | null
          criado_por_nome: string | null
          data_aprovacao: string | null
          data_validade: string | null
          descricao: string | null
          id: string
          numero_proposta: string
          observacoes: string | null
          status: string | null
          titulo: string | null
          updated_date: string | null
          valor_total: number | null
        }
        Insert: {
          cliente_id?: string | null
          cliente_nome?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          criado_por_id?: string | null
          criado_por_nome?: string | null
          data_aprovacao?: string | null
          data_validade?: string | null
          descricao?: string | null
          id: string
          numero_proposta: string
          observacoes?: string | null
          status?: string | null
          titulo?: string | null
          updated_date?: string | null
          valor_total?: number | null
        }
        Update: {
          cliente_id?: string | null
          cliente_nome?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          criado_por_id?: string | null
          criado_por_nome?: string | null
          data_aprovacao?: string | null
          data_validade?: string | null
          descricao?: string | null
          id?: string
          numero_proposta?: string
          observacoes?: string | null
          status?: string | null
          titulo?: string | null
          updated_date?: string | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "propostas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      publicacoes: {
        Row: {
          aprovado_por_humano: boolean | null
          conteudo: string | null
          created_at: string
          hashtags: string[] | null
          id: number
          subtitulo: string | null
          titulo: string | null
          url_da_imagem: string | null
        }
        Insert: {
          aprovado_por_humano?: boolean | null
          conteudo?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: number
          subtitulo?: string | null
          titulo?: string | null
          url_da_imagem?: string | null
        }
        Update: {
          aprovado_por_humano?: boolean | null
          conteudo?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: number
          subtitulo?: string | null
          titulo?: string | null
          url_da_imagem?: string | null
        }
        Relationships: []
      }
      reseller_api_keys: {
        Row: {
          api_key: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      Saldo: {
        Row: {
          Banco: string | null
          created_at: string
          id: number
          Saldo: string | null
        }
        Insert: {
          Banco?: string | null
          created_at?: string
          id?: number
          Saldo?: string | null
        }
        Update: {
          Banco?: string | null
          created_at?: string
          id?: number
          Saldo?: string | null
        }
        Relationships: []
      }
      st_activity_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          performed_by: string | null
          performed_by_name: string | null
          performed_by_role: string | null
          store_id: string | null
          task_id: string | null
          task_title: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          performed_by?: string | null
          performed_by_name?: string | null
          performed_by_role?: string | null
          store_id?: string | null
          task_id?: string | null
          task_title?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          performed_by?: string | null
          performed_by_name?: string | null
          performed_by_role?: string | null
          store_id?: string | null
          task_id?: string | null
          task_title?: string | null
        }
        Relationships: []
      }
      st_master_asaas_credentials: {
        Row: {
          account_email: string | null
          account_name: string | null
          api_key_encrypted: string
          created_at: string
          environment: string
          id: string
          master_user_id: string
          updated_at: string
          validated_at: string | null
          validation_status: string
          wallet_id: string
          webhook_token: string
        }
        Insert: {
          account_email?: string | null
          account_name?: string | null
          api_key_encrypted: string
          created_at?: string
          environment?: string
          id?: string
          master_user_id: string
          updated_at?: string
          validated_at?: string | null
          validation_status?: string
          wallet_id: string
          webhook_token?: string
        }
        Update: {
          account_email?: string | null
          account_name?: string | null
          api_key_encrypted?: string
          created_at?: string
          environment?: string
          id?: string
          master_user_id?: string
          updated_at?: string
          validated_at?: string | null
          validation_status?: string
          wallet_id?: string
          webhook_token?: string
        }
        Relationships: []
      }
      st_master_configs: {
        Row: {
          created_at: string | null
          document: string | null
          document_type: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          master_user_id: string
          phone: string | null
          platform_name: string | null
        }
        Insert: {
          created_at?: string | null
          document?: string | null
          document_type?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          master_user_id: string
          phone?: string | null
          platform_name?: string | null
        }
        Update: {
          created_at?: string | null
          document?: string | null
          document_type?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          master_user_id?: string
          phone?: string | null
          platform_name?: string | null
        }
        Relationships: []
      }
      st_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string | null
          related_task_id: string | null
          store_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          related_task_id?: string | null
          store_id?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          related_task_id?: string | null
          store_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      st_sector_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          sector_id: string
          store_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          sector_id: string
          store_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          sector_id?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_sector_categories_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "st_sectors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "st_sector_categories_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      st_sectors: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
          store_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          store_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_sectors_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      st_store_subscriptions: {
        Row: {
          asaas_customer_id: string | null
          asaas_subscription_id: string | null
          cancelled_at: string | null
          created_at: string
          customer_data: Json | null
          id: string
          master_user_id: string
          next_due_date: string | null
          payment_link: string | null
          payment_method: string | null
          plan_id: string
          status: string
          store_id: string
          updated_at: string
        }
        Insert: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          cancelled_at?: string | null
          created_at?: string
          customer_data?: Json | null
          id?: string
          master_user_id: string
          next_due_date?: string | null
          payment_link?: string | null
          payment_method?: string | null
          plan_id: string
          status?: string
          store_id: string
          updated_at?: string
        }
        Update: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          cancelled_at?: string | null
          created_at?: string
          customer_data?: Json | null
          id?: string
          master_user_id?: string
          next_due_date?: string | null
          payment_link?: string | null
          payment_method?: string | null
          plan_id?: string
          status?: string
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_store_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "st_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      st_store_users: {
        Row: {
          created_at: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          sector: string | null
          sector_id: string | null
          sector_ids: string[] | null
          store_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          phone?: string | null
          role: Database["public"]["Enums"]["app_role"]
          sector?: string | null
          sector_id?: string | null
          sector_ids?: string[] | null
          store_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          sector?: string | null
          sector_id?: string | null
          sector_ids?: string[] | null
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_store_users_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "st_sectors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "st_store_users_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      st_stores: {
        Row: {
          created_at: string
          created_by: string | null
          current_subscription_id: string | null
          document: string | null
          endereco: string | null
          id: string
          name: string
          owner_id: string
          razao_social: string | null
          subscription_status: string
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_subscription_id?: string | null
          document?: string | null
          endereco?: string | null
          id?: string
          name: string
          owner_id: string
          razao_social?: string | null
          subscription_status?: string
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_subscription_id?: string | null
          document?: string | null
          endereco?: string | null
          id?: string
          name?: string
          owner_id?: string
          razao_social?: string | null
          subscription_status?: string
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "st_stores_current_subscription_id_fkey"
            columns: ["current_subscription_id"]
            isOneToOne: false
            referencedRelation: "st_store_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      st_subscription_payments: {
        Row: {
          asaas_payment_id: string
          created_at: string
          due_date: string | null
          gross_amount_cents: number
          id: string
          invoice_url: string | null
          master_user_id: string
          net_amount_cents: number | null
          paid_at: string | null
          payment_method: string | null
          raw_event: Json | null
          status: string
          store_id: string
          subscription_id: string
          updated_at: string
        }
        Insert: {
          asaas_payment_id: string
          created_at?: string
          due_date?: string | null
          gross_amount_cents: number
          id?: string
          invoice_url?: string | null
          master_user_id: string
          net_amount_cents?: number | null
          paid_at?: string | null
          payment_method?: string | null
          raw_event?: Json | null
          status: string
          store_id: string
          subscription_id: string
          updated_at?: string
        }
        Update: {
          asaas_payment_id?: string
          created_at?: string
          due_date?: string | null
          gross_amount_cents?: number
          id?: string
          invoice_url?: string | null
          master_user_id?: string
          net_amount_cents?: number | null
          paid_at?: string | null
          payment_method?: string | null
          raw_event?: Json | null
          status?: string
          store_id?: string
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_subscription_payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "st_store_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      st_subscription_plans: {
        Row: {
          created_at: string
          cycle: string
          description: string | null
          id: string
          is_active: boolean
          master_user_id: string
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          cycle?: string
          description?: string | null
          id?: string
          is_active?: boolean
          master_user_id: string
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          cycle?: string
          description?: string | null
          id?: string
          is_active?: boolean
          master_user_id?: string
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      st_suggestions: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          message: string
          status: string
          store_id: string | null
          store_name: string | null
          updated_at: string
          user_id: string
          user_name: string
          user_role: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          message: string
          status?: string
          store_id?: string | null
          store_name?: string | null
          updated_at?: string
          user_id: string
          user_name: string
          user_role: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          message?: string
          status?: string
          store_id?: string | null
          store_name?: string | null
          updated_at?: string
          user_id?: string
          user_name?: string
          user_role?: string
        }
        Relationships: []
      }
      st_task_checklist_items: {
        Row: {
          checked_at: string | null
          checked_by: string | null
          created_at: string
          due_date: string | null
          id: string
          is_checked: boolean
          routine: string | null
          sort_order: number
          task_id: string
          title: string
          week_days: number[] | null
        }
        Insert: {
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          is_checked?: boolean
          routine?: string | null
          sort_order?: number
          task_id: string
          title: string
          week_days?: number[] | null
        }
        Update: {
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          is_checked?: boolean
          routine?: string | null
          sort_order?: number
          task_id?: string
          title?: string
          week_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "st_task_checklist_items_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "st_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      st_task_templates: {
        Row: {
          checklist_items: Json | null
          coin_value: number
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          media_required: boolean | null
          routine: string
          sector_id: string | null
          store_id: string
          timer_enabled: boolean | null
          title: string
          week_days: number[] | null
        }
        Insert: {
          checklist_items?: Json | null
          coin_value?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          media_required?: boolean | null
          routine?: string
          sector_id?: string | null
          store_id: string
          timer_enabled?: boolean | null
          title: string
          week_days?: number[] | null
        }
        Update: {
          checklist_items?: Json | null
          coin_value?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          media_required?: boolean | null
          routine?: string
          sector_id?: string | null
          store_id?: string
          timer_enabled?: boolean | null
          title?: string
          week_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "st_task_templates_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "st_sectors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "st_task_templates_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      st_task_timeline: {
        Row: {
          created_at: string
          event_type: string
          id: string
          media_url: string | null
          message: string | null
          performed_by: string
          performed_by_name: string
          performed_by_role: string | null
          store_id: string
          task_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          media_url?: string | null
          message?: string | null
          performed_by: string
          performed_by_name: string
          performed_by_role?: string | null
          store_id: string
          task_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          media_url?: string | null
          message?: string | null
          performed_by?: string
          performed_by_name?: string
          performed_by_role?: string | null
          store_id?: string
          task_id?: string
        }
        Relationships: []
      }
      st_tasks: {
        Row: {
          assigned_to: string | null
          category_ids: Json | null
          coin_value: number
          completed_at: string | null
          completed_by: string | null
          confirmed_by: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          elapsed_seconds: number | null
          group_id: string | null
          id: string
          media_required: boolean | null
          overdue_coin_debited: boolean
          overdue_penalized: boolean
          paused_at: string | null
          photo_url: string | null
          requires_confirmation: boolean
          routine: string
          sector_id: string | null
          started_at: string | null
          started_by: string | null
          started_by_name: string | null
          status: string
          store_id: string
          template_id: string | null
          timer_enabled: boolean | null
          title: string
          updated_at: string
          week_days: number[] | null
        }
        Insert: {
          assigned_to?: string | null
          category_ids?: Json | null
          coin_value?: number
          completed_at?: string | null
          completed_by?: string | null
          confirmed_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          elapsed_seconds?: number | null
          group_id?: string | null
          id?: string
          media_required?: boolean | null
          overdue_coin_debited?: boolean
          overdue_penalized?: boolean
          paused_at?: string | null
          photo_url?: string | null
          requires_confirmation?: boolean
          routine?: string
          sector_id?: string | null
          started_at?: string | null
          started_by?: string | null
          started_by_name?: string | null
          status?: string
          store_id: string
          template_id?: string | null
          timer_enabled?: boolean | null
          title: string
          updated_at?: string
          week_days?: number[] | null
        }
        Update: {
          assigned_to?: string | null
          category_ids?: Json | null
          coin_value?: number
          completed_at?: string | null
          completed_by?: string | null
          confirmed_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          elapsed_seconds?: number | null
          group_id?: string | null
          id?: string
          media_required?: boolean | null
          overdue_coin_debited?: boolean
          overdue_penalized?: boolean
          paused_at?: string | null
          photo_url?: string | null
          requires_confirmation?: boolean
          routine?: string
          sector_id?: string | null
          started_at?: string | null
          started_by?: string | null
          started_by_name?: string | null
          status?: string
          store_id?: string
          template_id?: string | null
          timer_enabled?: boolean | null
          title?: string
          updated_at?: string
          week_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "st_tasks_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "st_sectors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "st_tasks_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "st_tasks_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "st_task_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      st_wallet_monthly_history: {
        Row: {
          created_at: string
          final_balance: number
          id: string
          month: string
          store_id: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          created_at?: string
          final_balance?: number
          id?: string
          month: string
          store_id: string
          user_id: string
          wallet_id: string
        }
        Update: {
          created_at?: string
          final_balance?: number
          id?: string
          month?: string
          store_id?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_wallet_monthly_history_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "st_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      st_wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_month: string
          related_task_id: string | null
          related_user_id: string | null
          related_user_name: string | null
          store_id: string
          type: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_month: string
          related_task_id?: string | null
          related_user_id?: string | null
          related_user_name?: string | null
          store_id: string
          type: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_month?: string
          related_task_id?: string | null
          related_user_id?: string | null
          related_user_name?: string | null
          store_id?: string
          type?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "st_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      st_wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          is_blocked: boolean
          store_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          is_blocked?: boolean
          store_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          is_blocked?: boolean
          store_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "st_wallets_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "st_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      tipos_assunto: {
        Row: {
          ativo: boolean
          created_by_id: string | null
          created_date: string
          id: string
          nome: string
          ordem: number
          updated_date: string
        }
        Insert: {
          ativo?: boolean
          created_by_id?: string | null
          created_date?: string
          id?: string
          nome: string
          ordem?: number
          updated_date?: string
        }
        Update: {
          ativo?: boolean
          created_by_id?: string | null
          created_date?: string
          id?: string
          nome?: string
          ordem?: number
          updated_date?: string
        }
        Relationships: []
      }
      turbo_plans: {
        Row: {
          created_at: string | null
          default_price: number
          duration_label: string
          id: string
          min_price: number
          name: string
        }
        Insert: {
          created_at?: string | null
          default_price: number
          duration_label: string
          id: string
          min_price: number
          name: string
        }
        Update: {
          created_at?: string | null
          default_price?: number
          duration_label?: string
          id?: string
          min_price?: number
          name?: string
        }
        Relationships: []
      }
      turbo_sales: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          plan_id: string
          plan_name: string | null
          plan_price: number
          receipt_url: string | null
          seller_earning: number
          seller_id: string | null
          status: string
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          plan_id: string
          plan_name?: string | null
          plan_price: number
          receipt_url?: string | null
          seller_earning: number
          seller_id?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          plan_id?: string
          plan_name?: string | null
          plan_price?: number
          receipt_url?: string | null
          seller_earning?: number
          seller_id?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turbo_sales_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "turbo_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turbo_sales_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "turbo_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      turbo_seller_plans: {
        Row: {
          custom_base_price: number | null
          id: string
          plan_id: string
          price: number | null
          seller_id: string
        }
        Insert: {
          custom_base_price?: number | null
          id?: string
          plan_id: string
          price?: number | null
          seller_id: string
        }
        Update: {
          custom_base_price?: number | null
          id?: string
          plan_id?: string
          price?: number | null
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "turbo_seller_plans_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "turbo_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turbo_seller_plans_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "turbo_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      turbo_sellers: {
        Row: {
          active: boolean | null
          created_at: string | null
          display_name: string
          email: string | null
          id: string
          instagram: string | null
          phone: string | null
          pix_key: string | null
          pix_key_type: string | null
          slug: string
          temp_password: string | null
          tiktok: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          display_name: string
          email?: string | null
          id?: string
          instagram?: string | null
          phone?: string | null
          pix_key?: string | null
          pix_key_type?: string | null
          slug: string
          temp_password?: string | null
          tiktok?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          display_name?: string
          email?: string | null
          id?: string
          instagram?: string | null
          phone?: string | null
          pix_key?: string | null
          pix_key_type?: string | null
          slug?: string
          temp_password?: string | null
          tiktok?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      turbo_settings: {
        Row: {
          is_active: boolean | null
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          is_active?: boolean | null
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          is_active?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      turbo_withdrawals: {
        Row: {
          amount: number
          id: string
          notes: string | null
          pix_key_snapshot: string
          pix_key_type_snapshot: string
          processed_at: string | null
          processed_by: string | null
          requested_at: string | null
          seller_id: string
          status: string
        }
        Insert: {
          amount: number
          id?: string
          notes?: string | null
          pix_key_snapshot: string
          pix_key_type_snapshot: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string | null
          seller_id: string
          status?: string
        }
        Update: {
          amount?: number
          id?: string
          notes?: string | null
          pix_key_snapshot?: string
          pix_key_type_snapshot?: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string | null
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "turbo_withdrawals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "turbo_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          created_at: string
          created_by_id: string | null
          id: string
          module: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string | null
          id?: string
          module: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by_id?: string | null
          id?: string
          module?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      VR_produto: {
        Row: {
          codigobarras: number | null
          descricaocompleta: string | null
          estoque: number | null
          id: number
          precovenda: number | null
        }
        Insert: {
          codigobarras?: number | null
          descricaocompleta?: string | null
          estoque?: number | null
          id: number
          precovenda?: number | null
        }
        Update: {
          codigobarras?: number | null
          descricaocompleta?: string | null
          estoque?: number | null
          id?: number
          precovenda?: number | null
        }
        Relationships: []
      }
      VRJ_ofertas: {
        Row: {
          datainicio: string | null
          datatermino: string | null
          id_produto: number | null
          preconormal: number | null
          precooferta: number | null
          tipooferta: number | null
        }
        Insert: {
          datainicio?: string | null
          datatermino?: string | null
          id_produto?: number | null
          preconormal?: number | null
          precooferta?: number | null
          tipooferta?: number | null
        }
        Update: {
          datainicio?: string | null
          datatermino?: string | null
          id_produto?: number | null
          preconormal?: number | null
          precooferta?: number | null
          tipooferta?: number | null
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          ativo: boolean
          created_by_id: string | null
          created_date: string | null
          eventos: string[] | null
          id: string
          nome: string
          updated_date: string | null
          url: string
        }
        Insert: {
          ativo?: boolean
          created_by_id?: string | null
          created_date?: string | null
          eventos?: string[] | null
          id?: string
          nome: string
          updated_date?: string | null
          url: string
        }
        Update: {
          ativo?: boolean
          created_by_id?: string | null
          created_date?: string | null
          eventos?: string[] | null
          id?: string
          nome?: string
          updated_date?: string | null
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _migration_export_data: { Args: never; Returns: string }
      _migration_export_ddl: {
        Args: { p_table_prefix?: string }
        Returns: string
      }
      _migration_inventory: { Args: never; Returns: Json }
      fn_regenerate_tasks: { Args: never; Returns: undefined }
      fn_wallet_admin_adjust: {
        Args: {
          p_admin_id: string
          p_admin_name: string
          p_amount: number
          p_store_id: string
          p_user_id: string
          p_wallet_id: string
        }
        Returns: undefined
      }
      fn_wallet_credit: {
        Args: {
          p_amount?: number
          p_approver_id: string
          p_approver_name: string
          p_store_id: string
          p_task_id: string
          p_task_title: string
          p_user_id: string
        }
        Returns: undefined
      }
      fn_wallet_debit_reversal: {
        Args: {
          p_amount?: number
          p_performer_id: string
          p_performer_name: string
          p_store_id: string
          p_task_id: string
          p_task_title: string
          p_user_id: string
        }
        Returns: undefined
      }
      fn_wallet_monthly_reset: { Args: never; Returns: undefined }
      fn_wallet_overdue_penalty: {
        Args: {
          p_store_id: string
          p_task_id: string
          p_task_title: string
          p_user_id: string
        }
        Returns: undefined
      }
      fn_wallet_toggle_block: {
        Args: { p_admin_id: string; p_store_id: string; p_wallet_id: string }
        Returns: undefined
      }
      fn_wallet_transfer: {
        Args: {
          p_amount: number
          p_from_name: string
          p_from_user_id: string
          p_store_id: string
          p_to_name: string
          p_to_user_id: string
        }
        Returns: string
      }
      get_hotspot_user_cnpj: { Args: { _user_id: string }; Returns: string }
      get_master_asaas_key: {
        Args: { _master_id: string; _passphrase: string }
        Returns: {
          api_key: string
          environment: string
          validation_status: string
          wallet_id: string
          webhook_token: string
        }[]
      }
      get_master_store_ids: { Args: { _master_id: string }; Returns: string[] }
      get_turbo_seller_id: { Args: { _user_id: string }; Returns: string }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_store_role: {
        Args: { _store_id: string; _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_module_permission: {
        Args: { _module: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_of_user: {
        Args: { _admin_id: string; _target_user_id: string }
        Returns: boolean
      }
      is_avxsuporte_user: { Args: { _user_id: string }; Returns: boolean }
      is_hotspot_admin: { Args: { _user_id: string }; Returns: boolean }
      is_master: { Args: { _user_id: string }; Returns: boolean }
      is_store_member: {
        Args: { _store_id: string; _user_id: string }
        Returns: boolean
      }
      is_store_owner: {
        Args: { _store_id: string; _user_id: string }
        Returns: boolean
      }
      is_super_master: { Args: { _user_id: string }; Returns: boolean }
      is_turbo_master: { Args: { _user_id: string }; Returns: boolean }
      is_user_in_master_stores: {
        Args: { _master_id: string; _target_user_id: string }
        Returns: boolean
      }
      set_master_asaas_credentials: {
        Args: {
          _account_email?: string
          _account_name?: string
          _api_key: string
          _environment: string
          _master_id: string
          _passphrase: string
          _validation_status?: string
          _wallet_id: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "atendente"
        | "usuario_comum"
        | "master"
        | "supervisor"
        | "employee"
        | "super_master"
        | "vendedor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "atendente",
        "usuario_comum",
        "master",
        "supervisor",
        "employee",
        "super_master",
        "vendedor",
      ],
    },
  },
} as const
