import { supabase } from '../lib/supabase'

export async function createOrder({
  orderId, customer, items,
  paymentMethod, paymentRef,
  subtotal, deliveryFee, total,
}) {
  const { error: orderError } = await supabase.from('orders').insert({
    order_id:          orderId,
    customer_name:     customer.name,
    phone:             customer.phone,
    address:           customer.address,
    landmark:          customer.landmark || null,
    notes:             customer.notes    || null,
    payment_method:    paymentMethod,
    payment_reference: paymentRef,
    subtotal,
    delivery_fee:      deliveryFee,
    total,
    status:            'Pending',
  })

  if (orderError) throw orderError

  const { error: itemsError } = await supabase.from('order_items').insert(
    items.map((item) => ({
      order_id:   orderId,
      item_name:  item.name,
      quantity:   item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity,
    }))
  )

  if (itemsError) throw itemsError
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_id', orderId)
    .single()

  if (error) throw error
  return data
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('order_id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}
