use cabotaje_supplier;
Select * from login;

UPDATE LOGIN
SET DAT_EXP = DATE_ADD(NOW(), INTERVAL 30 DAY)
WHERE COD_USER = 1;