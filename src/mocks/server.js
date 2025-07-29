import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)

// Patch `once` onto the server manually
server.once = (...args) => {
  // MSW doesn't expose `once` directly, so we emulate it:
  const onceHandler = args[0]
  let called = false

  const wrapper = (req, res, ctx) => {
    if (!called) {
      called = true
      return onceHandler.resolver(req, res, ctx)
    }
    return null
  }

  const patched = {
    ...onceHandler,
    resolver: wrapper,
  }

  server.use(patched)
}

export { server }
