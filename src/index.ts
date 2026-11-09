import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello from API!',
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page');
  const id = c.req.param('id')
  c.header('X-Message', 'Hello from Hono!');
  return c.text(`Post ID: ${id}, Page: ${page}`);
})

app.post('/posts', (c) => c.text('Create a new post', 201))
app.delete('/posts/:id', (c) => c.text(`Delete post with ID: ${c.req.param('id')}`))

app.use('/admin/*', basicAuth({
  username: 'admin',
  password: 'password',
}))

app.get('/admin', (c) => {
  return c.text('Welcome to the admin area!')
})


export default app
