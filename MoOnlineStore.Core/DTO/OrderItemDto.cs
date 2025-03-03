﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MoOnlineStore.Core.DTO
{
  public  class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
