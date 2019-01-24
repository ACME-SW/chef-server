import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("tlogFactV2",{schema:"dbo"})
@Index("ix_jsonCreated",["jsonCreated",])
export class tlogFactV2 {

    @Column("timestamp",{ 
        nullable:false,
        name:"TS"
        })
    ts:Date;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"tlogId"
        })
    tlogId:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"siteId"
        })
    siteId:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"businessDate"
        })
    businessDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"jsonCreated"
        })
    jsonCreated:Date | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:25,
        name:"processingStatus"
        })
    processingStatus:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"jsonData"
        })
    jsonData:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"createdDate"
        })
    createdDate:Date | null;
        

    @Column("uniqueidentifier",{ 
        nullable:true,
        name:"batchId"
        })
    batchId:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"processStatus"
        })
    processStatus:string | null;
        

    @Column("varbinary",{ 
        nullable:true,
        name:"jsonDataCompress"
        })
    jsonDataCompress:Buffer | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"jsonDataDecompressed"
        })
    jsonDataDecompressed:string | null;
        
}
