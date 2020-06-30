import { ProdutoComando } from './produtoComanda';

export interface Comanda {
    "id": number,
    "date": Date,
    "id_mesa": number,
    "id_garcon": number,
    "id_cliente":number,
    "nome_cliente": string,
    "valor_comanda": number,
    "status": string,
    "lista_produto": [
        {
            "id_produto": number,
            "nome_produto": string,
            "quantidade": number,
            "preco": number,
            "valor_total": number
        }
    ]
}
