
-- критерий что размер хороший
is_good_size:: (a, a) -> Bool
is_good_size (w, h) = w <= 300 && w > 100 && h <= (500) && h > 100

-- проверяем весь список
is_good_img_list:: [(a, a)] -> Bool
is_good_img_list list = all is_good_size list

-- меняем высоту пикчи, соблюдая пропорции
change_height:: a -> (a, a) -> (a, a)
change_height nh (w, h) = if nh <= h then (w, h) else (w*nh/h, nh) 


-- пересчитываем список размеров для одной высоты
resize_all:: a -> [(a,a)] -> [(a, a)]
resize_all h list = map (change_height h) list 


-- выдает список преобразований размеров для списка высот
yoba :: [a] -> [(a, a)] -> [[(a, a)]]
yoba hlist img_list = map (\h -> resize_all h img_list) hlist

find_sizes hlist img_list = filter is_good_img_list yoba hlist img_list


main = find_sizes [500,490..200] [(283, 256),	(250, 297),	(324, 411),	(321, 392),	(200, 193),	(350, 185),	(226, 408)]


