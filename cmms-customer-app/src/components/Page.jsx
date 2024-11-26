import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = '', meta, className, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | CMMS`}</title>
        {meta}
      </Helmet>

      <div ref={ref} className={className} {...other}>
        {children}
      </div>
    </>
  )
);

export default Page;
