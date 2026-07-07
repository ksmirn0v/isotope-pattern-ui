import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders a chart after a successful compute request', async () => {
    const responseBody = [
      { name: 'C2H5OH', mass: 46.0419, probability: 0.955, isotopes: [] },
      { name: 'C2H5OH', mass: 47.0453, probability: 0.021, isotopes: [] },
    ]
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => responseBody,
    } as Response)

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/molecular formula/i), 'C2H5OH')
    await user.click(screen.getByRole('button', { name: /compute/i }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/isotope-pattern/api/compute'),
        expect.objectContaining({ method: 'POST' }),
      )
    })
    expect(await screen.findByText(/mass/i)).toBeInTheDocument()
  })

  it('shows an inline error message when the request fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ detail: 'Unknown element: Zz' }),
    } as Response)

    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/molecular formula/i), 'Zz2')
    await user.click(screen.getByRole('button', { name: /compute/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Unknown element: Zz')
  })
})
