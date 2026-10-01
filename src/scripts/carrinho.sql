
CREATE TABLE carrinho (
    id SERIAL PRIMARY KEY,
    usuario_id INT NULL,          
    session_id VARCHAR(255) NULL,   
    produto_id INT NOT NULL,       
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10,2) NOT NULL, 
    sabores VARCHAR(255) NULL,    
    borda VARCHAR(100) NULL,      
    observacoes TEXT NULL,       
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION atualizar_coluna_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_atualizar_carrinho
BEFORE UPDATE ON carrinho
FOR EACH ROW
EXECUTE FUNCTION atualizar_coluna_timestamp();
