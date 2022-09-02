const hotels=[
        {
                id:"1",
                name:"Bamboo Hotel",
                location:"Vũng Tàu",
                price:"279.000",
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/247106889.jpg?k=1cfd3279ec42d59d9ad935a8aebad19af85e54bbf7c6de6b0152d573b79abc95&o=&hp=1",
                detail:"Bamboo Hotel nằm ở thành phố Vũng Tàu, cách Bãi Sau 1,1 km và Khu du lịch sinh thái Hồ Mây 3,2 km. Khách sạn 1 sao này có sân hiên và phòng nghỉ gắn máy điều hòa với WiFi miễn phí cùng phòng tắm riêng. Chỗ nghỉ cung cấp dịch vụ lễ tân 24 giờ và dịch vụ tiền sảnh cho khách.\n\nTất cả phòng nghỉ tại khách sạn đều được trang bị TV và đồ vệ sinh cá nhân miễn phí."
        },
        {
                id:"2",
                name:"Sao Mai Hotel & Apartment",
                location:"Vũng Tàu",
                price:"349.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/333161264.jpg?k=c9b57d14d52792df87b4e5c42e07dec5f134e47c9df1efe4c0648679c65bcd01&o=&hp=1",
                detail:"Tọa lạc tại thành phố Vũng Tàu và cách Bạch Dinh 6 km, Sao Mai Hotel & Apartment có dịch vụ nhận phòng và trả phòng cấp tốc, phòng không gây dị ứng, vườn, WiFi miễn phí trong toàn bộ khuôn viên cũng như sân hiên. Chỗ nghỉ này nằm trong bán kính khoảng 8 km từ Khu du lịch sinh thái Hồ Mây, 8 km từ Tượng Chúa Kitô Vua và 9 km từ Mũi Nghinh Phong. Nơi đây cung cấp dịch vụ lễ tân 24 giờ, dịch vụ phòng và phòng giữ hành lý cho khách.\n\n Tất cả phòng nghỉ tại khách sạn có máy điều hòa, TV truyền hình cáp màn hình phẳng, tủ lạnh, ấm đun nước, vòi sen, dép, bàn làm việc, phòng tắm riêng và tủ để quần áo. Một số phòng có sân trong và tầm nhìn ra vườn. Các phòng được trang bị ga trải giường."
        },
        {
                id:"3",
                name:"ROSA VILLA & HOTEL Dalat",
                location:"Đà Lạt",
                price:"400.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/295463070.jpg?k=6245dabc3d334ce6a620107bd07be3cd30e540ef9d4397df4c5bc2ac9aa980ca&o=&hp=1",
                detail:"Tọa lạc tại thành phố Đà Lạt, ROSA VILLA & HOTEL Dalat cung cấp chỗ nghỉ với sân trong hoặc ban công, WiFi miễn phí và TV cũng như quầy bar và sảnh khách chung.\n\nf Mỗi căn đều được trang bị tủ lạnh, lò nướng, ấm đun nước, minibar và máy pha cà phê. Để thêm phần thuận tiện cho du khách, chỗ nghỉ có thể cung cấp khăn tắm và ga trải giường với một khoản phụ phí.",
        },
        {
                id:"4",
                name:"Raon Dalat",
                location:"Đà Lạt",
                price:"406.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/356163261.jpg?k=03c2db15a499c929349ce6b36c557f1f5461c9ae66eed4c14c7eccd6b7058ea0&o=&hp=1",
                detail:"Tọa lạc tại thành phố Đà Lạt, cách Vườn hoa Đà Lạt 2,8 km, Raon Dalat có chỗ nghỉ với sảnh khách chung, chỗ đỗ xe riêng miễn phí, khu vườn và sân hiên. Khách sạn 3 sao này cung cấp dịch vụ phòng và dịch vụ tiền sảnh. Chỗ nghỉ cung cấp dịch vụ lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên. \n\n Phòng nghỉ tại Raon Dalat được bố trí bàn làm việc và phòng tắm riêng với vòi xịt/chậu rửa vệ sinh cùng dép. Một số phòng còn có khu vực ghế ngồi. Các phòng được trang bị có máy sấy tóc, ga trải giường và sử dụng phòng tắm chung."
        },
        {
                id:"5",
                name:"La Sera Hotel",
                location:"Nha Trang",
                price:"292.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/362950665.jpg?k=422f8a45da94e13226eca212446f13cbf996e67a607e00805e848237d678fcec&o=&hp=1",
                detail:"Nằm trong bán kính 30 m từ Bãi biển Nha Trang, khách sạn La Sera Hotel ở thành phố Nha Trang này có tầm nhìn ra toàn cảnh từ quán sky pool bar. Du khách có thể dùng bữa tại nhà hàng ngay trong khuôn viên. \n\nMỗi phòng nghỉ theo phong cách hiện đại tại khách sạn này đều có khu vực tiếp khách, TV màn hình phẳng với các kênh truyền hình cáp và phòng tắm riêng. Một số phòng nhìn ra quang cảnh bãi biển, thành phố hoặc núi non.\n\n Lễ tân 24 giờ cung cấp rất nhiều dịch vụ trong đó có dịch vụ thu đổi ngoại tệ, sắp xếp tour du lịch, đặt vé cũng như trợ giúp đặc biệt. Khách sạn còn có cửa hàng quà tặng và cho thuê xe đạp."
        },
        {
                id:"6",
                name:"Araon Hotel",
                location:"Nha Trang",
                price:"558.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/383632690.jpg?k=57af6ec72b543626180b2a3ba67c6f05b7794d4888051093b6e0c99db63834fd&o=&hp=1",
                detail:"Tọa lạc tại thành phố Nha Trang, cách Bãi biển Nha Trang 200 m, Aaron Hotel cung cấp chỗ nghỉ bên bờ biển với nhiều tiện nghi như nhà hàng, trung tâm thể dục và sảnh khách chung. Trong số các tiện nghi của chỗ nghỉ này có bàn đặt tour, phòng giữ hành lý và WiFi miễn phí trong toàn bộ khuôn viên. Nơi đây cung cấp dịch vụ lễ tân 24 giờ, dịch vụ tiền sảnh và dịch vụ thu đổi ngoại tệ cho khách.\n\n Mỗi phòng nghỉ tại Aaron Hotel đều được bố trí máy điều hòa, khu vực ghế ngồi, TV truyền hình vệ tinh màn hình phẳng, két an toàn, ấm đun nước và phòng tắm riêng với dép cùng máy sấy tóc. Một số phòng có ban công trong khi các phòng còn lại nhìn ra biển. Các phòng được trang bị ga trải giường và khăn tắm."
        },
        {
                id:"7",
                name:"Gaia Hotel Phu Quoc",
                location:"Phú Quốc",
                price:"822.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/111940137.jpg?k=0aec3e08850d0c09976903dc2ee37bc842cdfbb22cfd5c05f3fd76de7c798651&o=&hp=1",
                detail:"Với hồ bơi ngoài trời và tầm nhìn ra biển, Gaia Hotel Phu Quoc nằm ở thị trấn Dương Đông trên đảo Phú Quốc, cách Chợ Đêm Phú Quốc 900 m. Khách sạn có hồ bơi ngoài trời mở cửa quanh năm cùng tiện nghi BBQ. Quý khách có thể thưởng thức bữa ăn tại nhà hàng hoặc đồ uống tại quầy bar. Wi-Fi và chỗ đỗ xe riêng trong khuôn viên đều được cung cấp miễn phí.\n\nCác phòng có máy điều hòa, TV truyền hình cáp màn hình phẳng và ấm đun nước. Một số phòng có khu vực ghế ngồi để khách thư giãn và/hoặc có tầm nhìn ra biển. Các phòng nghỉ tại đây có ấm đun nước và phòng tắm riêng với bồn tắm, dép, đồ vệ sinh cá nhân miễn phí cùng máy sấy tóc."
        },
        {
                id:"8",
                name:"Azura Resort",
                location:"Phú Quốc",
                price:"623.000",
                image:"https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/156818404.jpg?k=93a36fefc4a22f9e979b6a345a45fa3fe3fa430c13994da6eb3102c34f924a6d&o=&hp=1",
                detail:"Nằm trên đảo Phú Quốc, Azura Resort có nhà hàng, quầy bar, sảnh khách chung và khu vườn. Resort này có các phòng gia đình và tiện nghi BBQ. Chỗ nghỉ cung cấp dịch vụ lễ tân 24 giờ, dịch vụ phòng và dịch vụ thu đổi ngoại tệ cho khách.\n\n Mỗi phòng nghỉ của resort đều được bố trí máy điều hòa, khu vực ghế ngồi, TV truyền hình cáp màn hình phẳng, két an toàn, ấm đun nước và phòng tắm riêng với vòi xịt/chậu rửa vệ sinh, áo choàng tắm cùng dép. Một số phòng có sân trong trong khi những phòng còn lại nhìn ra hồ bơi. Tại Azura Resort, các phòng được trang bị ga trải giường và khăn tắm."
        }
]
export default hotels