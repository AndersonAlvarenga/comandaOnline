export interface Comanda{
    "id": number,
    "date": Date,
    "id_mesa": number,
    "id_garcon": number,
    "nome_cliente": string,
    "lista_produto": [
      {
        "id_pedido":number,
        "id_produto": number,
        "nome_produto":string,
        "quantidade": number,
        "preco": number,
        "valor_total": number
      }
    ],
    "valor_comanda": number,
    "status":string
 
}