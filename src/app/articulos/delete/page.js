import Form from "@/components/Form"
import db  from "@/lib/sqlite"
import { deleteArticulo } from "@/lib/actions"

async function page({ searchParams }) {
  const [articulo] = await db.all('select * from articulos where id = ?', [searchParams.id]);
  console.log(articulo);
  return (
    <div>
      <h3>Eliminar artículo {searchParams.id}</h3>
      <Form action={deleteArticulo} title='Eliminar artículo' articulo={articulo} disabled={true} />
    </div>
  )
}

export default page