﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MoOnlineStore.Core.EntityClasses.OrderAggregate
{
    public class DeliveryMethod :BaseEntity
    {
        public string  ShortName { get; set; }

        public string  DeliveryTime { get; set; }

        public string Description { get; set; }

        public decimal  Price { get; set; }
    }
}
