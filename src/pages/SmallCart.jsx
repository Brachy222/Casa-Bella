import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { closeCartDialog } from '../features/cartSlice';
import "../Styles/SmallCart.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: '400px',
    overflowY: 'auto',
  },
}));

const SmallCart = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.cart.isOpen); // האם הדיאלוג פתוח
  const cartItems = useSelector((state) => state.cart.arr); // מוצרים בעגלה
  const [sum, setSum] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);

  React.useEffect(() => {
    let totalSum = 0;
    let totalCnt = 0;
    cartItems.forEach((item) => {
      totalCnt += item.qty;
      totalSum += item.qty * item.price;
    });
    setCnt(totalCnt);
    setSum(totalSum);
  }, [cartItems]);

  const handleClose = () => {
    dispatch(closeCartDialog()); 
    window.history.back();
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        סל הקניות שלי
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography gutterBottom>הסל ריק</Typography>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="li-cart-small">
              <img src={item.image} alt="img item" className="img-cart-small" />
              <div className="div-in-cart-small">
                <p>{item.productName}</p>
                <p>מחיר: {item.price}</p>
                <p>כמות: {item.qty}</p>
              </div>
              <hr />
            </div>
          ))
        )}
        <Typography variant="h6" align="right">
          סה"כ מוצרים: {cnt}
        </Typography>
        <Typography variant="h6" align="right">
          סה"כ לתשלום: {sum}
        </Typography>
        {/* <Button variant="outlined" onClick={""}>
        להזמנה
      </Button> */}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SmallCart;
