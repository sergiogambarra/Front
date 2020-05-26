import React, { useRef, useEffect } from 'react';
import Files from 'react-files';
import './AnexarArquivosInput.css';
import { Form, Button } from 'react-bootstrap';

export default function AnexarArquivosInput({ anexos, setAnexos, onError }) {
    
    
    const refAnexos = useRef();


    useEffect(() => refAnexos.current.setState({ files: anexos }), [anexos]);

    const onFilesChange = async (anexos) => {
            const promises = anexos.map(
            anexo => new Promise((resolve) => {
                if (anexo instanceof Blob) {
                    let reader = new FileReader();
                   
                    reader.onload = () => {
                        
                        resolve({
                            nome: anexo.name,
                            tipo: anexo.extension,
                            tamanho: anexo.sizeReadable,
                            arquivo: reader.result,
                            file: anexo,
                        });
                    };

                    reader.readAsDataURL(anexo);
                } else {
                    resolve(anexo);
                }
            })
        );

        const anexosFormatados = await Promise.all(promises);
        return setAnexos(anexosFormatados);
    }

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const removerAnexo = (anexoParaRemover) => {
        setAnexos(anexos.filter(({ file }) => file.id !== anexoParaRemover.file.id));
    }

    const removerTodosAnexos = () => setAnexos([]);

    return (
        <>
            <Form.Group>
                <Files
                    ref={refAnexos}
                    className='files-dropzone-list'
                    style={{ height: '100px' }}
                    onChange={onFilesChange}
                    onError={onFilesError}
                    multiple
                    maxFiles={10}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    Clique ou solte aqui os arquivos para anexar
                </Files>
                {
                    (anexos && anexos.length > 0) ?
                        <div className='files-list'>
                            <ul>
                                {anexos.map((anexo) =>
                                    <li className='files-list-item' key={anexo.file.id}>
                                        <div className='files-list-item-preview'>{
                                            anexo.tipo === 'image' ?
                                                <img className='files-list-item-preview-image' src={anexo.file.preview.url} alt={'Preview do anexo'} />
                                                :
                                                <div className='files-list-item-preview-extension'>{anexo.tipo}</div>
                                        }</div>

                                        <div className='files-list-item-content'>
                                            <div className='files-list-item-content-item files-list-item-content-item-1'>{anexo.nome}</div>
                                            <div className='files-list-item-content-item files-list-item-content-item-2'>{anexo.tamanho}</div>
                                        </div>

                                        <div
                                            id={anexo.file.id}
                                            className='files-list-item-remove'
                                            onClick={() => removerAnexo(anexo)}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                        : null
                }
            </Form.Group>
            {onError &&
                <Form.Text className="text-danger">
                    O campo anexos é obrigatório
                </Form.Text>
            }
            <Form.Group className="d-flex justify-content-start m-0 p-0">
                <Button
                    variant="link"
                    className="m-0 p-0 border-0"
                    onClick={removerTodosAnexos}
                    disabled={!anexos.length}
                >
                    Remover todos os anexos
                </Button>
            </Form.Group>
        </>
    );
}