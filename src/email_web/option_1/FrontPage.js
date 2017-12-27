import React from 'react'
import FullLogo from '../../web/ui-kit/FullLogo'
import LogoCircle from '../../web/ui-kit/LogoCircle'
import Logo from '../../web/ui-kit/Logo'

const FrontPage =
  ({

   }) => (
    <div>
      {/*<LogoCircle*/}
        {/*scale={2}*/}
        {/*color="#aaaaaa"*/}
      {/*/>*/}
      <Logo
        scale={1}
        color="#aaaaaa"
      />
      <p>
        Delivering a curated list of the
        clothing sales you actually want,
        straight to your inbox.
      </p>
      <input type="button" value="Try it out"/>
    </div>
  )

export default FrontPage