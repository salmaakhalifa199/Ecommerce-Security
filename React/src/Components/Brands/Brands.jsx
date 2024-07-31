import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'

export default function Brands() {

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  const { data, isLoading } = useQuery('getBrands', getBrands)

  if (isLoading) {
    return <Loader />
  }

  return <>
    <h2 className='text-main text-center fw-bold my-3'>All Brands</h2>
    <div className="container">
      <div className="row text-center">
        {data.data.data.map((brand, idx) => <div key={idx} className="col-md-3">
          <div className='mb-3 product card'>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 250 }}
                image={brand.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {brand.name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>)}

      </div>
    </div>

    {/* <Pagination count={10} shape="rounded" /> */}
  </>
}
