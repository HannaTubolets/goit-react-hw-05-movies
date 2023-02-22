import { RotatingSquare } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <RotatingSquare
        height="150"
        width="150"
        color="#03b3f8"
        ariaLabel="rotating-square-loading"
        strokeWidth="2"
        visible={true}
      />
    </div>
  );
};
