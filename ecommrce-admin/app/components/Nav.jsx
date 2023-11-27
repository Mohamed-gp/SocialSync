import React from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <nav>
      <div className='flex gap-2'>
        <p>Your Ecommerce Statistics</p>
      </div>
      <ul className=''>
        <li>
          <p>Ecommerce Admin</p>
          <FontAwesomeIcon icon={faHome} />
        </li>
      </ul>
    </nav>
  )
}

export default Header