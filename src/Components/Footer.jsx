import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className=' text-center text-white' style={{background:'#474E68'}}>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>

          <MDBBtn outline color="light" floating className='m-1' href='mailto:muhammadmansoor270@gmail.com' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#404258' }}>
        2023  ©  Copyright
      </div>
    </MDBFooter>
  );
}

export default Footer;