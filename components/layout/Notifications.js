import {Wrap, Button, useToast, WrapItem} from '@chakra-ui/react'
import { useAddress } from '@thirdweb-dev/react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications, markDelivered, cleanNotifications } from '../../store/notifications'
export const Notifications = () => {
    const address = useAddress()
    const {user:walletUser} = useSelector(state => state.user);
    const Notifications = useSelector(state => state.globalNotifications);
    const toast = useToast()
    const dispatch = useDispatch();
    const positions = [
      'top',
      'top-right',
      'top-left',
      'bottom',
      'bottom-right',
      'bottom-left',
    ]
    useEffect(()=>{
        //check for notifications and show them as they're updated
        const interval = setInterval(() => {
            if(!!walletUser.username){
                dispatch(fetchNotifications(walletUser.id));
                console.log('refetching notifications')
            }
        }, 10000);
        if(!!walletUser.username && Notifications.status!=='success' && Notifications.status!=='loading'){
            dispatch(fetchNotifications(walletUser.id));
        }
        if(!!Notifications.notifications){
            if(Notifications.notifications.length>0){
                Notifications.notifications.map(notif=>{
                    const {content, id} = notif
                    showNotification(id, content)
                })
            }
        }
        return () =>{
            if(!!walletUser.username){
                clearInterval(interval);
            }
        }
        
    },[dispatch, Notifications, walletUser])
    console.log('notifications:' ,Notifications)
    const showNotification = (id, content) =>{
        if(!toast.isActive(id)){
            toast({
                id,
                title: `info`,
                description: content,
                position: 'top-right',
                duration: 5000,
                isClosable: true,
                onCloseComplete: ()=>makeDelivered(id),
            })
        }     
    }
    const makeDelivered = (id) => {
        console.log('closing: ',id)
        dispatch(markDelivered(id))
    }
    return (
      <>
      </>
    )
  }
export default Notifications