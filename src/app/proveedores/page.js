import Link from 'next/link'
import Proveedor from '@/components/proveedores'
import { getProveedores } from '@/lib/actions'

export default async function Home() {
    const proveedores = await getProveedores()
    // console.log(proveedores);

    return (
        <div>
            <Link className='enlace' href="/proveedores/new"> Nuevo Proveedor </Link>
            {
                proveedores.map((proveedor) => (
                    <Proveedor key={proveedor.id} proveedor={proveedor} >
                        <Link
                            className='enlace'
                            href={{ pathname: '/proveedores/edit', query: { id: proveedor.id } }}>
                            Editar artículo
                        </Link>
                        <Link
                            className='enlace'
                            href={{ pathname: '/proveedores/delete', query: { id: proveedor.id } }}>
                            Eliminar artículo
                        </Link>
                    </Proveedor>
                ))
            }
        </div>

    )
}
